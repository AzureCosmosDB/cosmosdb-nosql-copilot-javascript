import { useState } from "react";
import { Input } from "./ui/input"; // Input component
import { Button } from "./ui/button"; // Button component
import { Send } from "lucide-react"; // Icon for the send button

// Define props for the MessageInput component
interface MessageInputProps {
  // onSubmit is a function that takes a string (the user's message) as a parameter
  onSubmit: (question: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSubmit }) => {
  // State to hold the current input value from the user
  const [searchInput, setSearchInput] = useState<string>("");

  // Handle form submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    if (searchInput.trim() === "") return; // Do nothing if the input is empty
    onSubmit(searchInput); // Call the parent component's onSubmit function with the user's input
    setSearchInput(""); // Clear the input after submitting
  };

  // Handle Enter key press to submit the form
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default Enter key action (which submits the form)
      handleChatSubmit(e as unknown as React.FormEvent); // Manually call the submit handler
    }
  };

  return (
    // Form to submit the message
    <form onSubmit={handleChatSubmit} className="w-full p-4">
  {/* Input field and submit button */}
  <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 shadow-md p-3">
    {/* Text area field */}
    <textarea
      className="flex-1 resize-none bg-transparent dark:bg-transparent text-gray-900 dark:text-white border-none focus:ring-0 focus:outline-none px-3"
      rows={1}
      placeholder="Type your message here..." // Placeholder for the input field
      onChange={(e) => setSearchInput(e.target.value)} // Update the input state on change
      value={searchInput} // Bind the input value to the component state
      onKeyDown={handleKeyDown} // Handle key press events, specifically to detect Enter
    />
    {/* Submit button */}
    <Button
      size="icon"
      type="submit"
      className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
    >
      {/* Send icon for the button */}
      <Send className="w-5 h-5" />
    </Button>
  </div>
</form>

  );
};

export default MessageInput;
