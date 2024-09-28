import React, { Suspense, useState } from 'react';
import { Button } from './ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Loader, Menu } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import UserProfile from './UserProfile';
import ChatInterfaceSidebar from './ChatSidebar';
import { toast } from 'sonner';
import axios from 'axios';

const SERVER_URL: string = import.meta.env.VITE_SERVER_URL

interface IUserProfile {
    authorityType: string;
    name: string;
    username: string;
}

interface ChatHeaderProps {
    userData: IUserProfile;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ userData }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    const clearCache = async () => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${SERVER_URL}/cache`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            toast.success(response.data.message);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'Failed to clear cache.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex sm:justify-items-start justify-between items-center sm:gap-2">
            <Drawer>
                {/* DrawerTrigger for opening the drawer */}
                <DrawerTrigger asChild>
                    <Button variant="ghost" className="left-4 md:hidden z-auto">
                        <Menu className="w-6 h-6 text-black dark:text-white" />
                    </Button>
                </DrawerTrigger>
                {/* DrawerContent with side="left" */}
                <DrawerContent className="w-full">
                    <DrawerHeader>
                        <DrawerTitle>Chat History</DrawerTitle>
                    </DrawerHeader>
                    <Suspense fallback={<div>Loading Sidebar...</div>}>
                        <ChatInterfaceSidebar />
                    </Suspense>
                </DrawerContent>
            </Drawer>
            <h1 className="text-xl font-bold text-black dark:text-white">Your Assistant</h1>
            <div className='flex justify-end gap-2'>
                <Button
                    onClick={clearCache}
                    variant="ghost"
                    className="text-black dark:text-white">
                    {isLoading && <Loader className="animate-spin mr-2" />}
                    {isLoading ? 'Clearing...' : 'Clear Cache'}
                </Button>
                <ModeToggle />
                <UserProfile userData={userData} />
            </div>
        </div>
    );
};

export default ChatHeader;

