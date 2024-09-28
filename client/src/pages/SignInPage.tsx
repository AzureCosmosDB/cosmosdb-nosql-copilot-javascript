import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
import { Button } from '@/components/ui/button';
import Microsoft_logo from '../assets/microsoft_logo.svg';
import { toast } from "sonner"


const SignInPage: React.FC = () => {
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

  const handleLogin = () => { 
    if (inProgress === "none") {  // Ensure no login interaction is already in progress
        instance.loginPopup().catch(e => {
          alert(e); // Handle errors
          console.log(e)
        });
      } else {
        toast('Another interaction is in progress. Please complete it before logging in.');
    }
}

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white text-black shadow-md rounded-lg p-8 text-center flex flex-col gap-3">
        <h1 className="text-2xl font-bold mb-4 text-neutral">Welcome to Your Ai Assistant</h1>
        <span>There are currently no users signed in!</span>
        <Button
          className="btn btn-outline btn-primary"
          onClick={handleLogin}>
          <img src={Microsoft_logo} alt="logo" className="w-6 h-6 mr-2" />
          Sign In with Microsoft Email
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
