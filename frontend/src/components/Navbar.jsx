import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    display: "flex",
    gap: "20px",
    background: "#2b2d42",
    padding: "10px 20px",
    alignItems: "center",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <nav style={navStyle}>
      <Link to="/employees" style={linkStyle}>Employees</Link>
      <Link to="/departments" style={linkStyle}>Departments</Link>
      <Link to="/locations" style={linkStyle}>Locations</Link>
      <Link to="/tiers" style={linkStyle}>Tiers</Link>
    </nav>
  );
}

export default Navbar;
