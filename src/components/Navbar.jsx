import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    console.log("Search term:", searchTerm);
    navigate(`/home?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <header className="header">
        <div className="admin-dashboard-header">
          <img
            src="https://st5.depositphotos.com/72897924/62344/v/450/depositphotos_623440620-stock-illustration-eye-care-logo-icon-vector.jpg"
            alt="logo"
            className="admin-dashboard-logo"
          />
          <span className="admin-dashboard-title">Admin Dash</span>
        </div>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="header-search-input"
          />
          <button onClick={handleSearchClick} className="header-search-btn">
            Search
          </button>
        </div>
      </header>
      <aside className="sidebar">
        <div className="sidebar-links">
          <Link to="/" className="sidebar-link">
            Home
          </Link>
          <Link to="/product-form" className="sidebar-link">
            Add Product
          </Link>
          <Link to="/staff-details" className="sidebar-link">
            Staff Details
          </Link>
          <Link to="/notification" className="sidebar-link">
            Notification
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
