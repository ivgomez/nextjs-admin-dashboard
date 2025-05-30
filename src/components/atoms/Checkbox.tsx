import React from "react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, error, className = "", ...props }) => {
  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${className}`}
        {...props}
      />
      {label && (
        <label htmlFor={props.id} className='ml-2 block text-sm text-gray-900'>
          {label}
        </label>
      )}
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </div>
  );
};
