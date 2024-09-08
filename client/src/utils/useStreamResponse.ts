import { Message } from "../components/Chat";
import calculateTokens from './calculateTokens'; // Import the token calculation utility

const useStreamResponse = (setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
  return async (question: string) => {
    // Automatically calculate the tokens for the user message
    const userTokens = calculateTokens(question);
    const newMessage: Message = { role: 'user', content: question, tokens: userTokens, time: new Date() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await fetch('http://localhost:8000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      // Placeholder for the assistant message, with initial empty content
      const assistantPlaceholder: Message = { role: 'assistant', content: '', tokens: 0, time: new Date() };
      setMessages((prevMessages) => [...prevMessages, assistantPlaceholder]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          assistantResponse += chunk;

          // Automatically calculate tokens for the assistant message
          const assistantTokens = calculateTokens(assistantResponse);

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            // Update the last message (assistant placeholder) with the content and calculated tokens
            updatedMessages[updatedMessages.length - 1] = {
              ...updatedMessages[updatedMessages.length - 1],
              content: assistantResponse,
              tokens: assistantTokens,
            };
            return updatedMessages;
          });
        }
      }
    } catch (error) {
      console.error('Error fetching the stream:', error);
    }
  };
};

export default useStreamResponse;
