import React, { useState, useEffect, useRef } from "react";
import "./CommandPalette.css";

const CommandPalette = ({ isOpen, onClose, onCreateFile }) => {
  const [fileName, setFileName] = useState("untitled");
  const inputRef = useRef(null);
  const paletteRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, 8); // Highlight "untitled"
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paletteRef.current && !paletteRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onCreateFile(`${fileName}.rtf`);
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay">
      <div ref={paletteRef} className="command-palette">
        <input
          ref={inputRef}
          type="text"
          value={`${fileName}.rtf`}
          onChange={(e) => setFileName(e.target.value.replace(".rtf", ""))}
          onKeyDown={handleKeyDown}
          className="command-palette-input"
        />
      </div>
    </div>
  );
};

export default CommandPalette;
