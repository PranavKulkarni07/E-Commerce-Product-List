import React, { useState, useEffect } from "react";
import axios from "axios";
import Data from "../Charts/Data";
import BarChartData from "../Charts/BarChartData";
import PieChartData from "../Charts/PieChartData";

const Statistics = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [statsData, setStatsData] = useState({});
  const charts = { display: "flex" };

  //Fetches Data for displaying Statistics for Data, Bar Chart and Pie Chart
  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const response = await axios.get(
          `${window.location.origin}/statistic/${selectedMonth}`
        );
        setStatsData(response.data);
      } catch (error) {
        console.error("Error in Fetching Data: ", error);
      }
    };
    fetchData();
  }, [selectedMonth]);

  const handleDropdownChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      {/* Takes Month Name as Input */}
      <div className="month-stats">
        <label htmlFor="dropdown">Select Month:</label>
        <select
          id="dropdown"
          value={selectedMonth}
          onChange={handleDropdownChange}
        >
          <option value="">Select...</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        {selectedMonth && <div className="selected-month"></div>}
        {/*Renders Data such as Sold Items,Not Sold Items and Total Sales*/}
        <div className="dc">
          <p>Data Stats ({selectedMonth} Month)</p>
        </div>
        <div className="stats-container">
          <Data
            totalSaleAmount={statsData.totalSaleAmount}
            totalSoldItems={statsData.totalSoldItems}
            totalNotSoldItems={statsData.totalNotSoldItems}
          />
        </div>
      </div>
      {/* Renders Bar Chart*/}
      <div style={charts}>
        <BarChartData
          priceranges={statsData.priceRanges}
          month={selectedMonth}
        />
        <div className="pcb">
          {/* Renders Pie Chart */}
          <div className="pc">
            <p>Pie Chart Stats ({selectedMonth} Month)</p>
          </div>
          <PieChartData
            categoryCounts={statsData.categoryCounts}
            month={selectedMonth}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
