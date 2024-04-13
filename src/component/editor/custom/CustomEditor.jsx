import "./customEditor.css"; // Import the CSS file for styling
import React, { useEffect, useState } from "react";
import "@mui/material/styles"; // Import the Material-UI styles
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import LinkIcon from "@mui/icons-material/Link";

const RichTextEditor = () => {
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedHeading, setSelectedHeading] = useState("");
  const [activeStyles, setActiveStyles] = useState([]);

  const applyStyle = (style, value = null) => {
    document.execCommand(style, false, value);
    if (style === "createLink") {
      const linkElement = document.querySelector('a[href="' + value + '"]');
      if (linkElement) {
        linkElement.parentElement.classList.add("link-added");
      }
    }
    updateActiveStyles();
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    applyStyle("foreColor", e.target.value);
  };

  const handleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      applyStyle("createLink", url);
    }
  };

  const handleHeadingChange = (e) => {
    const newHeading = e.target.value;
    setSelectedHeading(newHeading);
    applyStyle("formatBlock", `<${newHeading}>`);
  };

  const toggleStyle = (style) => {
    applyStyle(style);
  };

  const updateActiveStyles = () => {
    const styles = [];
    const commands = [
      "bold",
      "italic",
      "underline",
      "insertOrderedList",
      "insertUnorderedList",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
    ];

    commands.forEach((command) => {
      if (document.queryCommandState(command)) {
        styles.push(command);
      }
    });

    // Check if the selection contains a link
    const selection = window.getSelection();
    const link = selection.anchorNode?.parentElement?.closest("a");

    if (link) {
      styles.push("link");
      link.style.color = "blue";
      link.style.textDecoration = "underline";
    }

    // Check if the selection is within a blockquote
    const blockquote =
      selection.anchorNode?.parentElement?.closest("blockquote");

    if (blockquote) {
      styles.push("blockquote");
    }

    setActiveStyles(styles);
  };

  useEffect(() => {
    updateActiveStyles();
  }, [content]);

  return (
    <>
      <div className="rich-text-editor-container">
        <div className="toolbar">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">header</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedHeading}
              label="header"
              onChange={handleHeadingChange}
            >
              <MenuItem value="h1">H1</MenuItem>
              <MenuItem value="h2">H2</MenuItem>
              <MenuItem value="h3">H3</MenuItem>
              <MenuItem value="h4">H4</MenuItem>
              <MenuItem value="h5">H5</MenuItem>
              <MenuItem value="h6">H6</MenuItem>
              <MenuItem value="blockquote">Blockquote</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={() => toggleStyle("bold")}
            startIcon={<FormatBoldIcon />}
            style={{
              minWidth: "40px",
              backgroundColor: activeStyles.includes("bold")
                ? "#ddd"
                : "transparent",
            }}
          >
            {/* Empty space for icon-only button */}
          </Button>
          <Button
            onClick={() => toggleStyle("underline")}
            startIcon={<FormatUnderlinedIcon />}
            style={{
              minWidth: "40px",
              backgroundColor: activeStyles.includes("underline")
                ? "#ddd"
                : "transparent",
            }}
          >
            {/* Empty space for icon-only button */}
          </Button>
          <Button
            onClick={() => toggleStyle("insertOrderedList")}
            startIcon={<FormatListNumberedIcon />}
            style={{
              minWidth: "40px",
              backgroundColor: activeStyles.includes("insertOrderedList")
                ? "#ddd"
                : "transparent",
            }}
          >
            {/* Empty space for icon-only button */}
          </Button>
          <Button
            onClick={() => toggleStyle("insertUnorderedList")}
            startIcon={<FormatListBulletedIcon />}
            style={{
              minWidth: "40px",
              backgroundColor: activeStyles.includes("insertUnorderedList")
                ? "#ddd"
                : "transparent",
            }}
          >
            {/* Empty space for icon-only button */}
          </Button>
          <Button
            onClick={() => toggleStyle("justifyLeft")}
            startIcon={<FormatAlignLeftIcon />}
            style={{
              minWidth: "40px",
              backgroundColor: activeStyles.includes("justifyLeft")
                ? "#ddd"
                : "transparent",
            }}
          >
            {/* Empty space for icon-only button */}
          </Button>
          <Button
            onClick={() => toggleStyle("justifyCenter")}
            startIcon={<FormatAlignCenterIcon />}
            style={{
              minWidth: "40px",
              backgroundColor: activeStyles.includes("justifyCenter")
                ? "#ddd"
                : "transparent",
            }}
          >
            {/* Empty space for icon-only button */}
          </Button>
          <Button
            onClick={() => toggleStyle("justifyRight")}
            startIcon={<FormatAlignRightIcon />}
            style={{
              minWidth: "40px",
              backgroundColor: activeStyles.includes("justifyRight")
                ? "#ddd"
                : "transparent",
            }}
          >
            {/* Empty space for icon-only button */}
          </Button>
          <Button
            onClick={() => toggleStyle("blockquote")}
            startIcon={<FormatAlignRightIcon />} // Use any suitable icon for blockquote
            style={{
              minWidth: "40px",
              backgroundColor: activeStyles.includes("blockquote")
                ? "#ddd"
                : "transparent",
            }}
          >
            {/* Empty space for icon-only button */}
          </Button>
          <Button
            onClick={() => handleLink()}
            startIcon={<LinkIcon />}
            style={{ minWidth: "40px" }}
          >
            {/* Empty space for icon-only button */}
          </Button>
          <Input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e)}
            style={{ marginLeft: "10px", minWidth: "40px" }}
          />
        </div>
      </div>

      <div
        className="editor"
        contentEditable
        onInput={(e) => setContent(e.target.innerHTML)}
      ></div>
      <div className="preview">
        <h2>Preview:</h2>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            color: activeStyles.includes("link") ? "blue" : "inherit",
            textDecoration: activeStyles.includes("link")
              ? "underline"
              : "none",
          }}
        ></div>
      </div>
    </>
  );
};

export default RichTextEditor;
