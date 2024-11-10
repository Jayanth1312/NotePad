import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import sideBar from "./assets/sidebar.svg";
import "./App.css";
import Editor from "./components/Editor";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="app">
      <Sidebar isCollapsed={isCollapsed} />
      <div className={`editor ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <div className="editor-wrapper">
          <button onClick={toggleSidebar} className="toggle-sidebar-btn">
            <img src={sideBar} alt="Toggle Sidebar" className="header-icon" />
          </button>
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default App;
