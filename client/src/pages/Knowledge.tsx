import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FileUpload from "@/components/FileUpload";

export default function Knowledge() {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }

    }, [isAuthenticated, navigate]);
    return (
        <div>
          <div className="min-h-screen bg-gray-100">
          <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Knowledge</h1>
                <FileUpload /> {/* Add the FileUpload component here */}
            </div>
        </div>
        </div>
    )
}

