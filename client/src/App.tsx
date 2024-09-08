import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignInPage.tsx";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { pca } from '../src/config/authConfig.ts'
import { MsalProvider } from "@azure/msal-react";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignInPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <HomePage /> ,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <MsalProvider instance={pca}>
      <RouterProvider router={router} />
    </MsalProvider>
  )
}

export default App
