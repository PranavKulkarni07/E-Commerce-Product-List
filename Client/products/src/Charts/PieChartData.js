import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

//Pie Chart Component
const PieChartData = ({ categoryCounts, month }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!categoryCounts || Object.keys(categoryCounts).length === 0) {
      return;
    }

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const color = d3
      .scaleOrdinal()
      .range(["#FF6384", "#36A2EB", "#FFCE56", "#33FF99"]);

    const data = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
    }));

    const svg = d3
      .select(chartRef.current)
      .selectAll("svg")
      .data([null])
      .join("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3.pie().value((d) => d.count);

    const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.category))
      .attr("stroke", "#fff")
      .style("stroke-width", "2px");

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .text(
        (d) =>
          `${d.data.category} (${(
            ((d.endAngle - d.startAngle) / (2 * Math.PI)) *
            100
          ).toFixed(2)}%)`
      );
  }, [categoryCounts]);

  return (
    <>
      {/* Renders a Pie Chart based on Category Count Values */}
      <div ref={chartRef}></div>
    </>
  );
};

export default PieChartData;
