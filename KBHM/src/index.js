import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, theme } from "antd";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'dayjs/locale/vi';
import locale from 'antd/locale/vi_VN';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    locale={locale}
    theme={{
      token: {
        borderRadius: 0,
      },
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
