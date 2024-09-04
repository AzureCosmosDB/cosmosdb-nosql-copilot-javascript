import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";


export default function HomePage() {

  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }

  }, [isAuthenticated, navigate]);


  return (
    <>
      <Navbar />
      <h3>chatPage</h3>

    </>
  )
}
