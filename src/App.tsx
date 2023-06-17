import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import DashboardPage from "./components/Dashboard";
import {AuthProvider} from "./services/AuthProvider";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/dashboard" element={<DashboardPage/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;