import React, { forwardRef } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconClick,
  className = '',
  ...props
}, ref) => {
  const inputClasses = `
    w-full px-3 py-2 border rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${LeftIcon ? 'pl-10' : ''}
    ${RightIcon ? 'pr-10' : ''}
    ${className}
  `.trim();

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className="h-4 w-4 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {RightIcon && (
          <div 
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
              onRightIconClick ? 'cursor-pointer' : 'pointer-events-none'
            }`}
            onClick={onRightIconClick}
          >
            <RightIcon className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;