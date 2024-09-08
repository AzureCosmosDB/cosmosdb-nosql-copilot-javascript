import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { LogOut, User } from "lucide-react";
import { useMsal } from "@azure/msal-react";

interface IUserProfileProps {
    userData: {
        authorityType: string;
        name: string;
        username: string;
    };
}

const UserProfile: React.FC<IUserProfileProps> = ({ userData }) => {
    const { instance } = useMsal();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline"><User className="hover:animate-spin" /> &nbsp; {userData.name}</Button>
            </SheetTrigger>
            <SheetContent className="min-w-fit">
                <SheetHeader>
                    <SheetTitle>User Profile</SheetTitle>
                    <SheetDescription>
                        Below is personal information about the user.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4">
                        <p><strong>Auth Type: </strong>{userData.authorityType}</p>
                        <p><strong>Name: </strong>{userData.name}</p>
                        <p><strong>Email: </strong>{userData.username}</p>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="button" variant="outline" onClick={() => instance.logoutPopup()}>
                            <LogOut /> &nbsp; LogOut
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    );
};

export default UserProfile;
