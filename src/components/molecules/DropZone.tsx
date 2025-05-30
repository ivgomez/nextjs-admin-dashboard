import React, { useCallback } from "react";
import { FileInput } from "@/components/atoms/FileInput";
import { DocumentIcon } from "@heroicons/react/24/outline";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  error?: string;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFileSelect, accept, maxSize, error }) => {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200'
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className='space-y-3 text-center'>
        <DocumentIcon className='mx-auto h-12 w-12 text-gray-400' />
        <div className='flex flex-col items-center text-sm text-gray-600'>
          <label
            htmlFor='file-upload'
            className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
          >
            <span>Upload a file</span>
            <FileInput
              id='file-upload'
              name='file-upload'
              accept={accept}
              onChange={handleFileChange}
              error={error}
              className='sr-only'
            />
          </label>
          <p className='mt-1'>or drag and drop</p>
          {maxSize && <p className='mt-1 text-xs text-gray-500'>Maximum file size: {maxSize}MB</p>}
          {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
        </div>
      </div>
    </div>
  );
};
