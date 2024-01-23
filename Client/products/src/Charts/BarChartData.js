import React from "react";
import PriceRangeBarChart from "./PriceRangeBarChart";

//Bar Chart Component
const BarChartData = ({ priceranges, month }) => {
  return (
    <div>
      <div className="bc">
        <p>Bar Chart Stats ({month} Month)</p>
      </div>
      {/* Renders a Bar Chart based on Price Ranges*/}
      <PriceRangeBarChart priceRanges={priceranges} />
    </div>
  );
};

export default BarChartData;
