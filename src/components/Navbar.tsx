import { Bot } from "lucide-react";
import { useMsal } from "@azure/msal-react";
import UserProfile from '../components/UserProfile'
import ThemeChanger from './ThemeChanger';

interface IUserProfile {
    authorityType: string;
    name: string;
    username: string;
}



export default function Navbar() {
    const { accounts, instance } = useMsal();
    console.log(accounts)

    const userData: IUserProfile = {
        authorityType: accounts[0]?.authorityType ?? '',
        name: accounts[0]?.name ?? '',
        username: accounts[0]?.username ?? '',
    };
    const openModal = () => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        modal.showModal();
    };

    return (
        <>
            <div className="navbar bg-base-100 shadow-xl">
                <div className="flex-1">
                    <span className="btn btn-ghost text-xl">
                        <Bot className="hover:animate-spin hover:text-red-600" />
                        ChatGPT Assistant
                    </span>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">

                        <li>
                            <details>
                                <summary>{userData.name}</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li>
                                        <button onClick={openModal}>
                                            Profile
                                        </button>
                                    </li>
                                    <li><button onClick={() => instance.logoutPopup()}>Logout</button></li>
                                </ul>
                            </details>
                        </li>
                        <ThemeChanger />
                    </ul>
                </div>
            </div>
            <UserProfile userData={userData} />
        </>
    );
}


