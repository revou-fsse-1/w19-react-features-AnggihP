import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './services/AuthProvider';
import App from './App';
import './App.css'

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);