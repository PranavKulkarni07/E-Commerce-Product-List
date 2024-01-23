import React from "react";
import { NavLink } from "react-router-dom";

// Navigation Bar Component
const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/products" activeClassName="active-link">
        Products
      </NavLink>
      <NavLink to="/statistics" activeClassName="active-link">
        Statistics
      </NavLink>
    </div>
  );
};

export default Navbar;
