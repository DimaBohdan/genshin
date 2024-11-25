import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllHeroes, fetchHeroDetails } from "../api/genshinApi";
import "../styles/styles.css";
import ElementFilter from "../components/HeroesList/ElementFilter";
import SortButton from "../components/SortButton";
import SearchBar from "../components/SearchBar";
import HeroCard from "../components/HeroesList/HeroCard";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchParams, setSearchParams] = useSearchParams();

  const heroesPerPage = 24;
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const getHeroes = async () => {
      try {
        const data = await fetchAllHeroes();
        const detailedHeroes = await Promise.all(
          data.map(async (heroName) => {
            const details = await fetchHeroDetails(heroName);
            return { name: heroName, element: details.vision, rarity: details.rarity };
          })
        );
        setHeroes(detailedHeroes);
        setFilteredHeroes(detailedHeroes);
      } catch (error) {
        console.error("Failed to fetch heroes:", error);
      }
    };
    getHeroes();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = heroes.filter(
      (hero) =>
        hero.name.toLowerCase().includes(query) &&
        (selectedElement ? hero.element === selectedElement : true)
    );
    setFilteredHeroes(filtered);
    setSearchParams({ page: 1 }); // Reset to the first page
  };

  const handleElementFilter = (element) => {
    setSelectedElement(element);

    const filtered = heroes.filter(
      (hero) =>
        (!element || hero.element === element) &&
        hero.name.toLowerCase().includes(searchQuery)
    );
    setFilteredHeroes(filtered);
    setSearchParams({ page: 1 }); // Reset to the first page
  };

  const handleSort = () => {
    const sortedHeroes = [...filteredHeroes].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setFilteredHeroes(sortedHeroes);
  };

  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = filteredHeroes.slice(indexOfFirstHero, indexOfLastHero);

  const totalPages = Math.ceil(filteredHeroes.length / heroesPerPage);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

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
