import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Chat from "@/components/Chat";


export default function HomePage() {

  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }

  }, [isAuthenticated, navigate]);


  return <Chat />

}
