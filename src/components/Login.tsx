import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError] = useState('');

    const history = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'https://mock-api.arikmpt.com/api/user/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (response.ok) {
                const data = await response.json(); 
                const { token } = data.data;
                console.log('Received token:', token); 
                login(token);
                setLoginSuccess(true);
                setEmail('');
                setPassword('');

                history('/dashboard');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleRegister = () => {
        history('/register');
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 rounded-md backdrop">
            <div className=' overflow-hidden rounded-md shadow border mt-0 max-w-md p-6'>
            <h1 className="text-3xl font-bold text-white mb-4">Login Here!</h1>
            {loginSuccess ? (
                <p className="text-red-500">Login successful!</p>
            ) : (
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    {loginError && (
                        <p className="text-red-500 mb-4">{loginError}</p>
                    )}
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white block mb-2">
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="border border-white px-3 py-2 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-white block mb-2">
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="border border-white px-3 py-2 rounded-md w-full"
                        />
                    </div>
                    <div className="flex flex-row">
                    <button
                        type="submit"
                        className="bg-white text-black px-6 py-2 mt-4 max-w-sm rounded-md hover:bg-blue-100 block mx-auto"
                        >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="bg-red-500 text-white px-6 py-2 mt-4 max-w-sm rounded-md hover:bg-gray-300 hover:text-black block mx-auto"
                    >
                        Register
                    </button>
                    </div>
                </form>
            )}
        </div>
        </div>
    );
};

export default LoginPage;
