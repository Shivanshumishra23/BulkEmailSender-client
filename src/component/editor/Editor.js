import React from "react";
import ReactQuill from "react-quill";
import { formats, modules } from "./editorModule";
import "quill/dist/quill.snow.css";

function QuilEditor({ value = "", handleProcedureContentChange }) {
  return (
    <ReactQuill
      theme="snow"
      style={{
        lineHeight: "0px",
        height: "320px",
        overflow: "hidden",
        borderRadius: "5px",
      }}
      className="editor ql-editor"
      modules={modules}
      defaultValue={value}
      formats={formats}
      placeholder="write your content ...."
      onChange={handleProcedureContentChange}
    />
  );
}

export default QuilEditor;
