import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllHeroes, fetchHeroDetails } from "../api/genshinApi";
import "../styles/styles.css";
import ElementFilter from "../components/HeroesList/ElementFilter";
import SortButton from "../components/SortButton";
import SearchBar from "../components/SearchBar";
import HeroCard from "../components/HeroesList/HeroCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { useLoader } from "../components/context/LoaderContext";

const HomePage = () => {
  const { showLoader, hideLoader } = useLoader();
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [searchParams, setSearchParams] = useSearchParams();
  const heroesPerPage = 24;

  const currentPage = parseInt(searchParams.get("page")) || 1;

  // -------- Загрузка героев ----------
  useEffect(() => {
    const getHeroes = async () => {
      showLoader();
      try {
        const data = await fetchAllHeroes();
        const detailedHeroes = await Promise.all(
          data.map(async (heroName) => {
            const details = await fetchHeroDetails(heroName);
            return {
              name: heroName,
              element: details.vision,
              rarity: details.rarity,
            };
          })
        );
        setHeroes(detailedHeroes);
      } catch (error) {
        console.error("Failed to fetch heroes:", error);
      }
      hideLoader();
    };
    getHeroes();
  }, [showLoader, hideLoader]);

  // -------- Фильтрация и сортировка ----------
  useEffect(() => {
    let result = [...heroes];

    if (searchQuery.trim()) {
      result = result.filter((hero) =>
        hero.name.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedElement) {
      result = result.filter((hero) => hero.element === selectedElement);
    }

    result.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setFilteredHeroes(result);
  }, [heroes, searchQuery, selectedElement, sortOrder]);

  // -------- Действия пользователя ----------
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setSearchParams({ page: 1 });
  };

  const handleElementFilter = (element) => {
    setSelectedElement(element);
    setSearchParams({ page: 1 });
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setSearchParams({ page: 1 });
  };

  // -------- Пагинация ----------
  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = filteredHeroes.slice(indexOfFirstHero, indexOfLastHero);

  const totalPages = Math.ceil(filteredHeroes.length / heroesPerPage);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  if (heroes.length === 0) return <Loader />;

  return (
    <div className="homepage">
      <h1>Genshin Impact Heroes</h1>
      <br />
      <SearchBar onSearch={handleSearch} value={searchQuery} />
      <ElementFilter onFilter={handleElementFilter} />
      <SortButton onSort={handleSort} sortOrder={sortOrder} />

      <HeroCard filteredHeroes={currentHeroes} onClick={() => {}} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
