import React, { useEffect, useState } from 'react';
import { fetchAllHeroes, fetchHeroDetails } from '../api/genshinApi';
import '../styles/styles.css';
import ElementFilter from '../components/ElementFilter';
import SortButton from '../components/SortButton';
import SearchBar from '../components/SearchBar';
import HeroCard from '../components/HeroCard';
import Pagination from '../components/Pagination'; // New Pagination Component

const HomePage = () => {
  const [heroes, setHeroes] = useState([]); // Raw hero data
  const [filteredHeroes, setFilteredHeroes] = useState([]); // Heroes after filtering
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [selectedElement, setSelectedElement] = useState(''); // Element filter
  const [sortOrder, setSortOrder] = useState('asc'); // Sort order (asc/desc)
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const heroesPerPage = 24; // Number of heroes per page

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
        console.error('Failed to fetch heroes:', error);
      }
    };
    getHeroes();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = heroes.filter(
      (hero) =>
        hero.name.toLowerCase().includes(query) &&
        (selectedElement ? hero.element === selectedElement : true)
    );
    setFilteredHeroes(filtered);
    setCurrentPage(1); // Reset to page 1
  };

  // Handle element filter
  const handleElementFilter = (element) => {
    setSelectedElement(element);

    const filtered = heroes.filter(
      (hero) =>
        (!element || hero.element === element) &&
        hero.name.toLowerCase().includes(searchQuery)
    );
    setFilteredHeroes(filtered);
    setCurrentPage(1); // Reset to page 1
  };

  // Handle sorting
  const handleSort = () => {
    const sortedHeroes = [...filteredHeroes].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setFilteredHeroes(sortedHeroes);
  };

  // Pagination logic
  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = filteredHeroes.slice(indexOfFirstHero, indexOfLastHero);

  const totalPages = Math.ceil(filteredHeroes.length / heroesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="homepage">
      <h1>Genshin Impact Heroes</h1>
      <br />
      {/* Search Component */}
      <SearchBar onSearch={handleSearch} value={searchQuery} />

      {/* Element Filter Component */}
      <ElementFilter onFilter={handleElementFilter} />

      {/* Sort Button Component */}
      <SortButton onSort={handleSort} sortOrder={sortOrder} />

      {/* Hero Grid */}
      <HeroCard filteredHeroes={currentHeroes} onClick={() => {}} />

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
