import React from 'react';
import ReactMarkdown from 'react-markdown'; // Used for rendering Markdown content
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // Syntax highlighting library
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Specific style/theme for code blocks

// Props for the custom code component that will render the code blocks
interface CodeComponentProps {
  inline?: boolean;  // Indicates if the code is inline (within text) or block-level
  className?: string; // Class name to apply language-specific styling (e.g., `language-js`)
  children: React.ReactNode; // The actual code content
}

// Custom component to handle code rendering (both inline and block-level code)
const SyntaxHighlighterComponent: React.FC<CodeComponentProps> = ({
  className,
  children,
  ...props
}) => {
  // Check if the code has a language class (e.g., `language-js`)
  const match = /language-(\w+)/.exec(className || '');

  // If it's not inline code and a language is matched, render with SyntaxHighlighter
  return  match ? (
    <SyntaxHighlighter
      style={materialDark} // Apply the materialDark theme for the code block
      language={match[1]} // Extract the language (e.g., `js`, `python`)
      PreTag="div" // Use <div> as the wrapper tag for the code block
      {...props}
    >
      {String(children).replace(/\n$/, '')} {/* Clean up trailing newlines */}
    </SyntaxHighlighter>
  ) : (
    // Fallback for inline or non-highlighted code
    <code className={className} {...props}>
      {children}
    </code>
  );
};

// Props for the Markdown component that will render markdown content including code
interface StyledMarkdownProps {
  children: string; // The markdown content (as a string)
}

// Component that renders Markdown with support for syntax-highlighted code
const StyledMarkdown: React.FC<StyledMarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        // Custom renderer for <code> elements (both inline and block)
        code({ className, children, ...props }) {
          return (
            <SyntaxHighlighterComponent
              inline={true} // Determine if the code should be inline
              className={className} // Pass the class name (e.g., for language-specific styling)
              {...props}
            >
              {children} {/* Render the actual code content */}
            </SyntaxHighlighterComponent>
          );
        },
      }}
    >
      {/* Render the markdown content */}
      {children} 
    </ReactMarkdown>
  );
};

export default StyledMarkdown;
