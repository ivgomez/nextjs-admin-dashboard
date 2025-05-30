"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  DocumentIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/atoms/Button";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Users", href: "/users", icon: UserGroupIcon },
  { name: "Content", href: "/content", icon: DocumentTextIcon },
  { name: "PDF Upload", href: "/pdf-upload", icon: DocumentIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className='flex h-full w-64 flex-col bg-gray-800'>
      <div className='flex h-16 items-center justify-center border-b border-gray-700'>
        <h1 className='text-xl font-bold text-white'>Admin Dashboard</h1>
      </div>
      <nav className='flex-1 space-y-1 px-2 py-4'>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon
                className={`mr-3 h-6 w-6 flex-shrink-0 ${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}
                aria-hidden='true'
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className='border-t border-gray-700 p-4'>
        <Button
          variant='ghost'
          fullWidth
          leftIcon={<ArrowRightOnRectangleIcon className='h-6 w-6' />}
          onClick={handleLogout}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
