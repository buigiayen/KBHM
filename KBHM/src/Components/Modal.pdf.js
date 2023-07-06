import { Modal } from "antd";
import React, { useEffect, useState } from "react";
// Core viewer
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDfViewer = ({ urlPDF, Open, onCancel }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Modal open={Open} onCancel={onCancel} width={1000 + "px"}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={urlPDF}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>
    </Modal>
  );
};
export default PDfViewer;
