"use client";

import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SearchBar } from "@/components/molecules/SearchBar";
import { UserForm, UserFormData } from "@/components/organisms/UserForm";
import { Button } from "@/components/atoms/Button";
import { Table } from "@/components/molecules/Table";
import { User, createUserColumns } from "./config/columns";

// Mock data - replace with API call later
const users: User[] = [
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

  const handleEdit = (user: { name: string; email: string; role: string }) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    // Handle delete
    console.log("Delete user:", id);
  };

  const columns = createUserColumns(handleEdit, handleDelete, loading);

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
          <Table columns={columns} data={filteredUsers} />
        </div>
      </div>
    </div>
  );
}
