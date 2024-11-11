import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import sideBar from "./assets/sidebar.svg";
import "./App.css";
import Editor from "./components/Editor";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCollapsed]);

  return (
    <div className="app">
      <Sidebar isCollapsed={isCollapsed} />
      <div className={`editor ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <div className="editor-wrapper">
          <button
            onClick={toggleSidebar}
            className="toggle-sidebar-btn"
            title="Toggle Sidebar (Ctrl + B)"
          >
            <img src={sideBar} alt="Toggle Sidebar" className="header-icon" />
          </button>
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default App;
