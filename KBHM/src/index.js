import React from 'react';
import ReactDOM from 'react-dom/client';
import {  ConfigProvider, theme } from 'antd';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider
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
