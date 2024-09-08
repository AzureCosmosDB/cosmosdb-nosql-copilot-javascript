import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import ChatComponent from "../components/ChatComponent";
import SideNav from "../components/SideNav";


export default function HomePage() {

  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }

  }, [isAuthenticated, navigate]);


  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex flex-row  min-w-full items-center justify-center bg-yellow-300">
        <SideNav />
        <ChatComponent />
      </main>
    </div>
  )
}
