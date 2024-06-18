import React, { useEffect, useState } from "react";
// Core viewer
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDfViewer = ({ urlPDF }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      {urlPDF && (
        <Viewer  fileUrl={urlPDF} plugins={[defaultLayoutPluginInstance]} />
      )}
    </Worker>
  );
};
export default PDfViewer;
