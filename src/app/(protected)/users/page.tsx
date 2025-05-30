"use client";

import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SearchBar } from "@/components/molecules/SearchBar";
import { UserForm, UserFormData } from "@/components/organisms/UserForm";
import { Button } from "@/components/atoms/Button";

// Mock data - replace with API call later
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-03-14",
  },
  // Add more mock users as needed
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserFormData | undefined>();
  const [loading, setLoading] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSubmit = async (data: UserFormData) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setLoading(false);
    setShowForm(false);
    setSelectedUser(undefined);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <UserGroupIcon className='h-6 w-6 text-gray-400' />
          <h1 className='text-2xl font-semibold text-gray-900'>Users</h1>
        </div>
        <Button variant='primary' onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add User"}
        </Button>
      </div>

      {showForm && (
        <div className='rounded-lg bg-white shadow'>
          <div className='p-6'>
            <h2 className='text-lg font-medium text-gray-900 mb-6'>{selectedUser ? "Edit User" : "Add New User"}</h2>
            <UserForm onSubmit={handleSubmit} initialData={selectedUser} loading={loading} />
          </div>
        </div>
      )}

      <div className='rounded-lg bg-white shadow'>
        <div className='p-6'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h2 className='text-base font-semibold leading-6 text-gray-900'>Users</h2>
              <p className='mt-2 text-sm text-gray-700'>A list of all users in your application.</p>
            </div>
          </div>
          <div className='mt-4'>
            <SearchBar onSearch={handleSearch} placeholder='Search users...' />
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
                        Name
                      </th>
                      <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        Email
                      </th>
                      <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        Role
                      </th>
                      <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        Status
                      </th>
                      <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        Last Login
                      </th>
                      <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                        <span className='sr-only'>Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                          {user.name}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{user.email}</td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{user.role}</td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              user.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{user.lastLogin}</td>
                        <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                          <Button
                            variant='secondary'
                            size='sm'
                            onClick={() => {
                              setSelectedUser({
                                name: user.name,
                                email: user.email,
                                role: user.role.toLowerCase(),
                              });
                              setShowForm(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant='danger'
                            size='sm'
                            className='ml-4'
                            onClick={() => {
                              // Handle delete
                              console.log("Delete user:", user.id);
                            }}
                          >
                            Delete
                          </Button>
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
