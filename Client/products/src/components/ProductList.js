import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

//Product Cards List Component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchValue, setSearchValue] = useState("");

  //Fetches Data based on Selected Month and Search Value
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post(
        `${window.location.origin}/search/${selectedMonth}`,
        {
          searchValue: searchValue,
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error in Fetching Data: ", error);
    }
  }, [selectedMonth, searchValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //Pagination Code
  const pageSize = 6;
  const totalCards = products.length;
  const totalPages = Math.ceil(totalCards / pageSize);

  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (validPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setCurrentPage(1);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      {/* Takes Month Name as Input */}
      <div className="search-container">
        <label>Select Month:</label>
        <select
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <option key={index} value={getMonthName(index)}>
              {getMonthName(index)}
            </option>
          ))}
        </select>
        {/* Takes Seacrh Value as Input */}
        <label>Search:</label>
        <input type="text" value={searchValue} onChange={handleSearchChange} />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClearSearch}>Clear Search</button>
      </div>
      {/* Renders Product List */}
      <div className="card-container">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            imageSrc={product.image}
          />
        ))}
      </div>
      {/* Pagination Feature */}
      <div className="pagination">
        <button onClick={handlePrevPage}>&lt; Previous</button>
        <p>
          Page {validPage} of {totalPages}
        </p>
        <button onClick={handleNextPage}>Next &gt;</button>
      </div>
    </div>
  );
};

const getMonthName = (index) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[index];
};

export default ProductList;
