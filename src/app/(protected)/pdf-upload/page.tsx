import { DocumentIcon } from "@heroicons/react/24/outline";

export default function PDFUploadPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-3'>
        <DocumentIcon className='h-6 w-6 text-gray-400' />
        <h1 className='text-2xl font-semibold text-gray-900'>PDF Upload</h1>
      </div>

      <div className='rounded-lg bg-white shadow'>
        <div className='p-6'>
          <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg'>
            <div className='space-y-1 text-center'>
              <DocumentIcon className='mx-auto h-12 w-12 text-gray-400' />
              <div className='flex text-sm text-gray-600'>
                <label
                  htmlFor='file-upload'
                  className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                >
                  <span>Upload a file</span>
                  <input id='file-upload' name='file-upload' type='file' className='sr-only' accept='.pdf' />
                </label>
                <p className='pl-1'>or drag and drop</p>
              </div>
              <p className='text-xs text-gray-500'>PDF up to 10MB</p>
            </div>
          </div>
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
