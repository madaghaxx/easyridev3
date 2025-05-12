import React from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className,
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label 
          htmlFor={props.id} 
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          "px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;