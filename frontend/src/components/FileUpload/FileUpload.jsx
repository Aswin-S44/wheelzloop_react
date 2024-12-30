import "./FileUpload.css";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ handleFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Pass the selected files to your handler
      handleFiles(acceptedFiles);
    },
    [handleFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], // Restrict to images
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #007bff",
        padding: "20px",
        textAlign: "center",
        borderRadius: "8px",
        background: isDragActive ? "#f1f1f1" : "#fff",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <p>
        {isDragActive
          ? "Drop the files here..."
          : "Drag and drop files here, or click to select files"}
      </p>
    </div>
  );
};

export default FileUpload;
