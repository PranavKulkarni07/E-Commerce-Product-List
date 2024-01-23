import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

//Component for Rendering a Bar Chart
const PriceRangeBarChart = ({ priceRanges }) => {
  const barChartRef = useRef();
  const xRef = useRef();

  const margin = { top: 20, right: 30, bottom: 70, left: 60 };
  const width = 650 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;

  useEffect(() => {
    if (!priceRanges || Object.keys(priceRanges).length === 0) {
      return;
    }

    const svg = d3.select(barChartRef.current);

    const data = Object.entries(priceRanges).map(([range, count]) => ({
      range,
      count,
    }));

    xRef.current = d3
      .scaleBand()
      .domain(data.map((d) => d.range))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll("*").remove();

    // Bars
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xRef.current(d.range))
      .attr("y", (d) => y(d.count))
      .attr("width", xRef.current.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", (d) => color(d.range));

    // X-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(xRef.current))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-0.5em")
      .attr("dy", "0.5em");

    // Y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(y));

    // X-axis label
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${width / 2 + margin.left},${height + margin.top + 60})`
      )
      .style("text-anchor", "middle")
      .text("Price Range");

    // Y-axis label
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${margin.left - 40},${height / 2 + margin.top})rotate(-90)`
      )
      .style("text-anchor", "middle")
      .text("Number of items");
  }, [priceRanges, width, height, margin.left, margin.top]);

  return (
    // Renders a Bar Chart based on Price Ranges
    <div className="bcc">
      <svg
        ref={barChartRef}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      />
    </div>
  );
};

export default PriceRangeBarChart;
