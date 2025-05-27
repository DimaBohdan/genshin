import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllFoods } from "../api/genshinApi";
import "../styles/styles.css";
import SearchBar from "../components/SearchBar";
import FoodCard from "../components/Foods/FoodCard";
import Pagination from "../components/Pagination";
import SortButton from "../components/SortButton";
import Loader from "../components/Loader";

const FoodsPage = () => {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchParams, setSearchParams] = useSearchParams();

  const foodsPerPage = 24;
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const getFoods = async () => {
      try {
        const data = await fetchAllFoods();
        const foodArray = Object.keys(data)
        .filter((key) => key !== "id" && key !== "bulle-souffle")
        .map((key) => ({
            ...data[key],
            name: key,
        }));

        setFoods(foodArray);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      }
    };
    getFoods();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

  };

  const handleSort = () => {
    const sortedFoods = [...foods].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setFoods(sortedFoods);
  };

  const filteredFoods = foods.filter((food) =>
    (food.name).toLowerCase().includes(searchQuery)
  );

  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

  const totalPages = Math.ceil(filteredFoods.length / foodsPerPage);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  if (foods<foodsPerPage) {
    return <Loader></Loader>;
  }

  return (
    <div className="homepage">
      <h1>Genshin Impact Foods</h1>
      <br />
      <SearchBar onSearch={handleSearch} value={searchQuery} />
      <SortButton onSort={handleSort} sortOrder={sortOrder} />
      <div>
        <FoodCard foods={currentFoods} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FoodsPage;
