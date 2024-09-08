import { ArrowRight, Cloud, MessageSquareMore, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // UI components for cards
import { Button } from './ui/button'; // Custom Button component
import cosmosdbicon from '../assets/cosmosdb.svg'; // Importing the cosmosdb icon for display in the sidebar header

export default function ChatSidebar() {
  return (
    <div className="min-w-[20%] md:min-h-full bg-white dark:bg-gray-800 border-r overflow-x-clip">
      {/* Header Section of the Sidebar */}
      <div className="flex items-center justify-between p-4 bg-blue-500 dark:bg-gray-900 text-white">
        <div className="flex items-center space-x-2">
          {/* Cosmos DB Icon and Cloud Icon */}
          <img src={cosmosdbicon} alt="logo" className="w-6 h-6" /> {/* Cosmos DB Logo */}
          <Cloud className="w-6 h-6" /> {/* Cloud Icon */}
        </div>
        {/* Button to collapse the sidebar */}
        <Button size="icon" variant="default" className="bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-blue-600 dark:hover:bg-gray-600">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Create New Chat Button */}
      <Button className="min-w-fit w-[90%] m-2" variant="outline">
        <PlusCircle className="w-10 h-4 mr-2" /> {/* Plus Icon */}
        Create New Chat {/* Button Text */}
      </Button>

      {/* List of Chat Cards */}
      <div className="p-2">
        <Card className='bg-blue-600 dark:bg-gray-700'>
          {/* Chat Title Section */}
          <CardHeader className='flex flex-row gap-2'>
            <MessageSquareMore className="transform scale-x-[-1] text-white" /> {/* Mirrored Message Icon */}
            <CardTitle className='text-white'>North American lakes...</CardTitle> {/* Chat Title */}
          </CardHeader>

          {/* Chat Info Section */}
          <CardContent className="p-2 flex justify-between items-center border-t-slate-900 dark:border-t-gray-600 h-10" style={{ borderTopWidth: '1px' }}>
            {/* Tokens Used */}
            <span className="text-sm font-medium rounded-sm text-black dark:text-white bg-white dark:bg-gray-600 px-2">Tokens Used: 14</span>

            {/* Edit and Delete Buttons */}
            <div>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white dark:text-gray-300">
                <Pencil className="w-4 h-4" /> {/* Pencil Icon (Edit Chat) */}
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white dark:text-gray-300">
                <Trash2 className="w-4 h-4" /> {/* Trash Icon (Delete Chat) */}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
