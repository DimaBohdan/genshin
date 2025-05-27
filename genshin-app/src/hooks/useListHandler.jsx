import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useListHandler = (fetchData, filterFunction = () => true, itemsPerPage = 24) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null); 
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    getData();
  }, [fetchData]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) &&
        (!selectedFilter || filterFunction(item, selectedFilter))
    );
    setFilteredItems(filtered);
    setSearchParams({ page: 1 });
  };

  const handleFilter = (filterValue) => {
    setSelectedFilter(filterValue);

    const filtered = items.filter(
      (item) =>
        (!filterValue || filterFunction(item, filterValue)) &&
        item.name.toLowerCase().includes(searchQuery)
    );
    setFilteredItems(filtered);
    setSearchParams({ page: 1 });
  };

  const handleSort = () => {
    const sorted = [...filteredItems].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setFilteredItems(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  return {
    currentItems,
    filteredItems,
    handleSearch,
    handleSort,
    handleFilter,
    handlePageChange,
    searchQuery,
    sortOrder,
    currentPage,
    totalPages,
  };
};
