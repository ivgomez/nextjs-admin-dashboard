"use client";

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { useState } from "react";

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
  const [items, setItems] = useState(contentItems);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<(typeof contentItems)[0] | null>(null);

  const handleAddContent = () => {
    // TODO: Implement add content functionality
    console.log("Add content clicked");
  };

  const handleEdit = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setEditingItem(item);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const updatedItem = {
        ...editingItem,
        title: formData.get("title") as string,
        type: formData.get("type") as string,
        status: formData.get("status") as string,
      };

      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error("Failed to update content");
      }

      setItems(items.map((item) => (item.id === editingItem.id ? updatedItem : item)));
      setEditingItem(null);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/content?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete content");
      }

      // Remove the item from the list
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <DocumentTextIcon className='h-6 w-6 text-gray-400' />
          <h1 className='text-2xl font-semibold text-gray-900'>Content Management</h1>
        </div>
        <Button variant='primary' onClick={handleAddContent}>
          Add Content
        </Button>
      </div>

      {editingItem ? (
        <div className='rounded-lg bg-white shadow'>
          <div className='p-6'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>Edit Content</h2>
            <form onSubmit={handleSaveEdit} className='space-y-4'>
              <Input id='title' name='title' type='text' label='Title' defaultValue={editingItem.title} required />

              <div>
                <label htmlFor='type' className='block text-sm font-medium leading-6 text-gray-900'>
                  Type
                </label>
                <select
                  id='type'
                  name='type'
                  defaultValue={editingItem.type}
                  className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option value='Text'>Text</option>
                  <option value='Announcement'>Announcement</option>
                  <option value='Document'>Document</option>
                </select>
              </div>

              <div>
                <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
                  Status
                </label>
                <select
                  id='status'
                  name='status'
                  defaultValue={editingItem.status}
                  className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option value='Published'>Published</option>
                  <option value='Draft'>Draft</option>
                </select>
              </div>

              <div className='flex justify-end space-x-3'>
                <Button variant='secondary' onClick={handleCancelEdit} type='button'>
                  Cancel
                </Button>
                <Button type='submit' disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
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
                      {items.map((item) => (
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
                            <Button variant='secondary' size='sm' onClick={() => handleEdit(item.id)}>
                              Edit
                            </Button>
                            <Button
                              variant='danger'
                              size='sm'
                              className='ml-4'
                              onClick={() => handleDelete(item.id)}
                              disabled={loading}
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
      )}
    </div>
  );
}
