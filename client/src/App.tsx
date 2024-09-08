import { Button } from "./components/ui/button";

import SignInPage from "./pages/SignInPage.tsx";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

export default function App() {

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
    <RouterProvider router={router} />
  )
}