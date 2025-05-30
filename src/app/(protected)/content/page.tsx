"use client";

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Table } from "@/components/molecules/Table";
import { useState } from "react";
import { ContentItem, createContentColumns } from "./config/columns";

// Mock data - replace with API call later
const contentItems: ContentItem[] = [
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
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

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

      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = createContentColumns(handleEdit, handleDelete, loading);

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

              <Select
                id='type'
                name='type'
                label='Type'
                defaultValue={editingItem.type}
                options={[
                  { value: "Text", label: "Text" },
                  { value: "Announcement", label: "Announcement" },
                  { value: "Document", label: "Document" },
                ]}
              />

              <Select
                id='status'
                name='status'
                label='Status'
                defaultValue={editingItem.status}
                options={[
                  { value: "Published", label: "Published" },
                  { value: "Draft", label: "Draft" },
                ]}
              />

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
            <Table columns={columns} data={items} />
          </div>
        </div>
      )}
    </div>
  );
}
