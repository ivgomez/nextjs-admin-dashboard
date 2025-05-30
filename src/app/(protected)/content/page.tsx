import { DocumentTextIcon } from "@heroicons/react/24/outline";

// Mock data - replace with API call later
const contentItems = [
  {
    id: 1,
    title: "Welcome Message",
    type: "Text",
    status: "Published",
    lastUpdated: "2024-03-15",
  },
  {
    id: 2,
    title: "Feature Announcement",
    type: "Announcement",
    status: "Draft",
    lastUpdated: "2024-03-14",
  },
  {
    id: 3,
    title: "User Guide",
    type: "Document",
    status: "Published",
    lastUpdated: "2024-03-13",
  },
];

export default function ContentPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <DocumentTextIcon className='h-6 w-6 text-gray-400' />
          <h1 className='text-2xl font-semibold text-gray-900'>Content Management</h1>
        </div>
        <button
          type='button'
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Add Content
        </button>
      </div>

      <div className='rounded-lg bg-white shadow'>
        <div className='p-6'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h2 className='text-base font-semibold leading-6 text-gray-900'>Content Items</h2>
              <p className='mt-2 text-sm text-gray-700'>A list of all content items in your application.</p>
            </div>
          </div>
          <div className='mt-8 flow-root'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                      >
                        Title
                      </th>
                      <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        Type
                      </th>
                      <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        Status
                      </th>
                      <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        Last Updated
                      </th>
                      <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                        <span className='sr-only'>Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {contentItems.map((item) => (
                      <tr key={item.id}>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                          {item.title}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{item.type}</td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              item.status === "Published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{item.lastUpdated}</td>
                        <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                          <button className='text-indigo-600 hover:text-indigo-900 mr-4'>Edit</button>
                          <button className='text-red-600 hover:text-red-900'>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
