import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";


export default function HomePage() {

  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const { accounts, instance } = useMsal();
  const userData = accounts[0]!;


  if (!isAuthenticated) {
    navigate("/");
  } else {
    return (
      <div className="card bg-base-100 w-96 shadow-xl min-h-fit">
        <div className="card-body">
          <h2 className="card-title">
            AuthType:
            <div className="badge badge-secondary">{userData.authorityType} </div>
          </h2>
          <p>Name:{userData.name}</p>
          <p>Email:{userData.username}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-sm btn-warning"
              onClick={() => instance.logoutPopup()}>
              LogOut
            </button>
          </div>
        </div>
      </div>
    )
  }
}
