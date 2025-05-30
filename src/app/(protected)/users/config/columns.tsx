import React from "react";
import { Button } from "@/components/atoms/Button";
import { Column } from "@/components/molecules/Table";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

export const createUserColumns = (
  onEdit: (user: { name: string; email: string; role: string }) => void,
  onDelete: (id: number) => void,
  loading: boolean
): Column<User>[] => [
  {
    header: "Name",
    accessor: (user) => user.name,
    className: "font-medium text-gray-900",
  },
  {
    header: "Email",
    accessor: (user) => user.email,
  },
  {
    header: "Role",
    accessor: (user) => user.role,
  },
  {
    header: "Status",
    accessor: (user) => (
      <span
        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
          user.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {user.status}
      </span>
    ),
  },
  {
    header: "Last Login",
    accessor: (user) => user.lastLogin,
  },
  {
    header: "",
    accessor: (user) => (
      <div className='text-right'>
        <Button
          variant='secondary'
          size='sm'
          onClick={() =>
            onEdit({
              name: user.name,
              email: user.email,
              role: user.role.toLowerCase(),
            })
          }
        >
          Edit
        </Button>
        <Button variant='danger' size='sm' className='ml-4' onClick={() => onDelete(user.id)} disabled={loading}>
          Delete
        </Button>
      </div>
    ),
    className: "relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0",
  },
];
