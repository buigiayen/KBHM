import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import locale from "antd/locale/vi_VN";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "dayjs/locale/vi";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    locale={locale}
    theme={{
      token: {
        borderRadius: 0,
      },
    }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
