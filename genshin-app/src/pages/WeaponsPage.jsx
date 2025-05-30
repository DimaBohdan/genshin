import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllWeapons, fetchWeaponDetails } from "../api/genshinApi";
import "../styles/styles.css";
import SearchBar from "../components/SearchBar";
import WeaponCard from "../components/Weapons/WeaponCard";
import Pagination from "../components/Pagination";
import SortButton from "../components/SortButton";
import Loader from "../components/Loader";

const WeaponsPage = () => {
  const [weapons, setWeapons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchParams, setSearchParams] = useSearchParams();

  const weaponsPerPage = 24;
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const getWeapons = async () => {
      try {
        const data = await fetchAllWeapons();
        const detailedWeapons = await Promise.all(
          data.map(async (weaponName) => {
            const details = await fetchWeaponDetails(weaponName);
            return {
              name: weaponName,
              rarity: details.rarity,
            };
          })
        );
        setWeapons(detailedWeapons);
      } catch (error) {
        console.error("Failed to fetch weapons:", error);
      }
    };
    getWeapons();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchParams({ page: 1 });
  };

  const handleSort = () => {
    const sortedWeapons = [...weapons].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setWeapons(sortedWeapons);
  };

  const filteredWeapons = weapons.filter((weapon) =>
    weapon.name.toLowerCase().includes(searchQuery)
  );

  const indexOfLastWeapon = currentPage * weaponsPerPage;
  const indexOfFirstWeapon = indexOfLastWeapon - weaponsPerPage;
  const currentWeapons = filteredWeapons.slice(indexOfFirstWeapon, indexOfLastWeapon);

  const totalPages = Math.ceil(filteredWeapons.length / weaponsPerPage);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };
  
  if (weapons<weaponsPerPage) {
    return <Loader></Loader>;
  }

  return (
    <div className="homepage">
      <h1>Genshin Impact Weapons</h1>
      <br />
      <SearchBar onSearch={handleSearch} value={searchQuery} />
      <SortButton onSort={handleSort} sortOrder={sortOrder} />
      <div>
        <WeaponCard weapons={currentWeapons} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default WeaponsPage;
