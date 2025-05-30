import { UserGroupIcon, DocumentTextIcon, DocumentIcon } from "@heroicons/react/24/outline";

const stats = [
  { name: "Total Users", value: "1,234", icon: UserGroupIcon },
  { name: "Content Items", value: "56", icon: DocumentTextIcon },
  { name: "PDF Documents", value: "12", icon: DocumentIcon },
];

export default function Home() {
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {stats.map((stat) => (
          <div key={stat.name} className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <stat.icon className='h-6 w-6 text-gray-400' aria-hidden='true' />
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='truncate text-sm font-medium text-gray-500'>{stat.name}</dt>
                  <dd className='text-lg font-semibold text-gray-900'>{stat.value}</dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='rounded-lg bg-white shadow'>
        <div className='p-6'>
          <h2 className='text-lg font-medium text-gray-900'>Recent Activity</h2>
          <div className='mt-6 flow-root'>
            <ul role='list' className='-my-5 divide-y divide-gray-200'>
              <li className='py-4'>
                <div className='flex items-center space-x-4'>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium text-gray-900'>New user registered</p>
                    <p className='truncate text-sm text-gray-500'>2 hours ago</p>
                  </div>
                </div>
              </li>
              <li className='py-4'>
                <div className='flex items-center space-x-4'>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium text-gray-900'>New content added</p>
                    <p className='truncate text-sm text-gray-500'>4 hours ago</p>
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
