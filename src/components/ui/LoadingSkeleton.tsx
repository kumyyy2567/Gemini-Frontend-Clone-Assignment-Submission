import React from 'react';
import { cn } from '../../utils/cn';

interface LoadingSkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  children,
}) => {
  if (children) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700',
        className
      )}
    />
  );
};

export const MessageSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex space-x-3">
        <LoadingSkeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton className="h-4 w-3/4" />
          <LoadingSkeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const ChatroomSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center space-x-3 p-4">
        <LoadingSkeleton className="h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton className="h-4 w-3/4" />
          <LoadingSkeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);