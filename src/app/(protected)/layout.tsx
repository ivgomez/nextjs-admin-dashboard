import { Inter } from "next/font/google";
import Sidebar from "@/components/organisms/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <div className='flex h-screen bg-gray-100'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto p-8'>{children}</main>
      </div>
    </div>
  );
}
