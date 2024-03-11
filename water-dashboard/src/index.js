import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// optional configuration
const options = {
    position: positions.TOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
);