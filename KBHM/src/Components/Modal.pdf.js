import { Modal } from "antd";
import React, { useEffect, useState } from "react";
// Core viewer
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDfViewer = ({ DataPDF, Open, onCancel }) => {1
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const base64toBlob = () => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    console.log(DataPDF);
    const base64WithoutPrefix = DataPDF;
    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    const blob = Blob([out], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    console.log(url);
    return url;
  };

  return (
    <Modal open={Open} onCancel={onCancel} width={1000 + "px"}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={base64toBlob}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>
    </Modal>
  );
};
export default PDfViewer;
