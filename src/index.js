import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1e90ff',  // Azul
        colorSecondary: '#00ced1', // Turquesa
        colorBgBase: '#ffffff',    // Blanco
      },
    }}
  >
    <App />
  </ConfigProvider>
);