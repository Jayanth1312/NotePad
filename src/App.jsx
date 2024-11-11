import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import CommandPalette from "./components/CommandPalette";
import sideBar from "./assets/sidebar.svg";
import "./App.css";
import Editor from "./components/Editor";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCreateFile = (fileName) => {
    setFiles([...files, fileName]);
  };

  const handleNewNote = () => {
    setIsCommandPaletteOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      } else if (e.ctrlKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCollapsed]);

  return (
    <div className="app">
      <Sidebar
        isCollapsed={isCollapsed}
        files={files}
        onNewNote={handleNewNote}
      />
      <div className={`editor ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <div className="editor-wrapper">
          <button
            onClick={toggleSidebar}
            className="toggle-sidebar-btn"
            title="Toggle Sidebar (Alt + B)"
          >
            <img src={sideBar} alt="Toggle Sidebar" className="header-icon" />
          </button>
          <Editor />
        </div>
      </div>
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onCreateFile={handleCreateFile}
      />
    </div>
  );
}

export default App;
