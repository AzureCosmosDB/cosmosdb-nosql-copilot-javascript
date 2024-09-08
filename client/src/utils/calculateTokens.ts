// Utility function to calculate tokens
//more info OpenAI help center(https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them#h_63fd902129)
const calculateTokens = (content: string): number => {
    const charCount = content.length; // Count total characters
    const wordCount = content.trim().split(/\s+/).length; // Count words
    
    // Calculate tokens based on character and word count approximation
    const tokenCountByChars = Math.ceil(charCount / 4); // 1 token ~= 4 characters
    const tokenCountByWords = Math.ceil(wordCount * (1 / 0.75)); // 1 token ~= ¾ words
  
    // Average out both character-based and word-based calculations
    const tokenCount = Math.ceil((tokenCountByChars + tokenCountByWords) / 2);
  
    return tokenCount;
  };

  export default calculateTokens
  