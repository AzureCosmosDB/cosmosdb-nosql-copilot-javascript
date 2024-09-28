import { Suspense, lazy } from 'react';

const SignInPage = lazy(() => import('./pages/SignInPage.tsx'));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

import { pca } from '../src/config/authConfig.ts'
import { MsalProvider } from "@azure/msal-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignInPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    
  ]);

  return (
    <MsalProvider instance={pca}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </MsalProvider>
  )
}