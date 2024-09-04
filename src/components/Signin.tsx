import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";

const Login: React.FC = () => {
    const { instance, accounts, inProgress } = useMsal();
    const navigate = useNavigate();

    // Use useEffect to navigate based on the account state
    useEffect(() => {
        if (accounts.length > 0) {
            navigate('/home');
        }
    }, [accounts, navigate]);

    if (inProgress === "login") {
        return (
            <div className='flex items-center gap-2'>
                <span className='loading loading-dots loading-lg text-green-500 ms-4'></span>
                Login is currently in progress!
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 text-center flex flex-col gap-3">
                <h1 className="text-2xl font-bold mb-4 text-neutral">Login</h1>
                <span>There are currently no users signed in!</span>
                <button
                    className="btn btn-outline btn-primary"
                    onClick={() => instance.loginPopup()}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
