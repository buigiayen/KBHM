import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDfViewer = ({ DataPDF, Open, onCancel }) => {

    const [urlPDf, SetUrlPdf] = useState();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const base64toBlob = ({ data }) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data;
        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);

        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }

        return new Blob([out], { type: 'application/pdf' });
    };
    useEffect(() => {
        if (DataPDF) {
            const blob = base64toBlob({ data: DataPDF });
            const url = URL.createObjectURL(blob);
            SetUrlPdf(url)
        }

    }, [DataPDF])

    return (
        <Modal open={Open} onCancel={onCancel} width={1000  +'px'}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                    fileUrl={urlPDf}
                    plugins={[
                        defaultLayoutPluginInstance,
                    ]}
                />
            </Worker>
        </Modal>
    );
}
export default PDfViewer