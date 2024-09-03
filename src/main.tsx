import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";

import SigninPage from './pages/SigninPage.tsx';
import HomePage from './pages/HomePage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import { pca } from '../src/config/authConfig.ts'



const router = createBrowserRouter([
  {
    path: "/",
    element: <SigninPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <HomePage /> ,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={pca}>
      <RouterProvider router={router} />
    </MsalProvider>
  </StrictMode>,
)
