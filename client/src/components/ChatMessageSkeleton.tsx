// ChatMessageSkeleton.tsx

import React from 'react';

interface ChatMessageSkeletonProps {
  role?: 'user' | 'assistant';
}

const ChatMessageSkeleton: React.FC<ChatMessageSkeletonProps> = ({ role = 'assistant' }) => {
  return (
    <div className={`flex mb-4 ${role === 'user' ? 'justify-start' : 'justify-end'}`}>
      <div className="min-w-[80%] border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse">
        {/* Card Header Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Avatar Placeholder */}
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            {/* Role and Name Placeholder */}
            <div className="space-y-2">
              <div className="h-4 bg-slate-700 rounded w-24"></div>
              <div className="h-4 bg-slate-700 rounded w-16"></div>
            </div>
          </div>
          {/* Tokens and Time Placeholder */}
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-slate-700 rounded w-16"></div>
            <div className="h-4 bg-slate-700 rounded w-20"></div>
          </div>
        </div>
        {/* Card Content Skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageSkeleton;
