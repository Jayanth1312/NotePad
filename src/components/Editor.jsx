import React, { useRef, useEffect } from "react";
import "./editor.css";

function Editor() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (titleRef.current && !titleRef.current.textContent) {
      titleRef.current.dataset.empty = true;
    }
    if (contentRef.current && !contentRef.current.textContent) {
      contentRef.current.dataset.empty = true;
    }
  }, []);

  const handleInput = (ref, placeholder) => (e) => {
    const element = e.currentTarget;
    const isEmpty = element.textContent.trim() === "";
    element.dataset.empty = isEmpty;

    if (isEmpty) {
      element.textContent = "";
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
      const selection = window.getSelection();

      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const selectedText = selection.toString();

      if (!selectedText) return;

      switch (e.key.toLowerCase()) {
        case "b": {
          e.preventDefault();
          document.execCommand("bold", false, null);
          break;
        }
        case "i": {
          e.preventDefault();
          document.execCommand("italic", false, null);
          break;
        }
        case "l": {
          e.preventDefault();
          const listHtml = selectedText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line) => `<li>${line}</li>`)
            .join("");

          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = `<ul>${listHtml}</ul>`;

          range.deleteContents();
          range.insertNode(tempDiv.firstChild);
          selection.removeAllRanges();
          break;
        }
      }
    }
  };

  return (
    <div className="editor-container">
      <div
        ref={titleRef}
        className="editor-title"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput(titleRef, "Untitled")}
        data-placeholder="Untitled"
        spellCheck="true"
      />
      <div
        ref={contentRef}
        className="editor-content"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput(contentRef, "Start writing...")}
        onKeyDown={handleKeyDown}
        data-placeholder="Start writing..."
        spellCheck="true"
      />
    </div>
  );
}

export default Editor;
