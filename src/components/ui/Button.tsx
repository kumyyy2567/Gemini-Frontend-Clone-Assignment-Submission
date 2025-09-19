import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-primary text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300',
    secondary: 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-gray-900 dark:text-gray-100 shadow-md hover:shadow-lg transition-all duration-300',
    outline: 'border-2 border-purple-500/50 bg-transparent hover:bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:border-purple-500 transition-all duration-300',
    ghost: 'bg-transparent hover:bg-gray-100/80 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300 transition-all duration-300',
    destructive: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300',
    gradient: 'bg-gradient-primary text-white shadow-lg hover:shadow-glow hover:scale-105 transform transition-all duration-300 animate-glow',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm font-medium',
    md: 'px-6 py-3 text-sm font-semibold',
    lg: 'px-8 py-4 text-base font-semibold',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium relative overflow-hidden',
        'focus:outline-none focus-ring',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100',
        'before:absolute before:inset-0 before:bg-white/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
