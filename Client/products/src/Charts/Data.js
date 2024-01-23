import React from "react";

//Data Component
const Data = (props) => {
  const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = props;
  return (
    // Renders a Data for Total Sales ,Sold Items and Not Sold Items
    <div className="horizontal-strip">
      <h4>Total Sale Amount: {totalSaleAmount}</h4>
      <h4>Total Sold Items: {totalSoldItems}</h4>
      <h4>Total Not Sold Items: {totalNotSoldItems}</h4>
    </div>
  );
};

export default Data;
