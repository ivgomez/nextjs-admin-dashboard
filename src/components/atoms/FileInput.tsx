import React from "react";

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  accept?: string;
}

export const FileInput: React.FC<FileInputProps> = ({ label, error, className = "", accept, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={props.id} className='block text-sm font-medium leading-6 text-gray-900'>
          {label}
        </label>
      )}
      <div className='mt-2'>
        <input
          type='file'
          accept={accept}
          className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${className}`}
          {...props}
        />
      </div>
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </div>
  );
};
