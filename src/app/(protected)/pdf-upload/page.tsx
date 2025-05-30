"use client";

import { DocumentIcon } from "@heroicons/react/24/outline";
import { DropZone } from "@/components/molecules/DropZone";
import { useState } from "react";

export default function PDFUploadPage() {
  const [error, setError] = useState("");

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB
      setError("File size must be less than 10MB");
    } else {
      setError("");
      // Aquí puedes manejar la subida del archivo
      console.log("File selected:", file.name);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-3'>
        <DocumentIcon className='h-6 w-6 text-gray-400' />
        <h1 className='text-2xl font-semibold text-gray-900'>PDF Upload</h1>
      </div>

      <div className='rounded-lg bg-white shadow'>
        <div className='p-6'>
          <DropZone onFileSelect={handleFileSelect} accept='.pdf' maxSize={10} error={error} />
        </div>
      </div>

      <div className='rounded-lg bg-white shadow'>
        <div className='p-6'>
          <h2 className='text-lg font-medium text-gray-900'>Uploaded Files</h2>
          <div className='mt-6 flow-root'>
            <ul role='list' className='-my-5 divide-y divide-gray-200'>
              <li className='py-4'>
                <div className='flex items-center space-x-4'>
                  <div className='flex-shrink-0'>
                    <DocumentIcon className='h-6 w-6 text-gray-400' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium text-gray-900'>example.pdf</p>
                    <p className='truncate text-sm text-gray-500'>Uploaded 2 hours ago</p>
                  </div>
                  <div>
                    <button
                      type='button'
                      className='inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    >
                      Download
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
