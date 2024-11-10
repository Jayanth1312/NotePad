import React, { useState, useEffect } from "react";
import searchIcon from "../assets/search.svg";
import "./sidebar.css";

const Sidebar = ({ isCollapsed }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        document.querySelector(".search-input")?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>

      <div className={`search-container ${isCollapsed ? "hidden" : ""}`}>
        <div className="search-wrapper">
          <img src={searchIcon} alt="Search Icon" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search.."
            className="search-input"
          />
          <span className="shortcut">Ctrl + K</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
