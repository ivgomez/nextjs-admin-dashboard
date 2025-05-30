"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to register");
      }

      router.push("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-200'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>Create a new account</h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{" "}
          <Link href='/auth/login' className='font-medium text-indigo-600 hover:text-indigo-500'>
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {error && (
            <div className='mb-4 rounded-md bg-red-50 p-4'>
              <div className='text-sm text-red-700'>{error}</div>
            </div>
          )}
          <form className='space-y-6' onSubmit={handleSubmit}>
            <Input id='name' name='name' type='text' label='Full name' autoComplete='name' required />

            <Input id='email' name='email' type='email' label='Email address' autoComplete='email' required />

            <Input
              id='password'
              name='password'
              type='password'
              label='Password'
              autoComplete='new-password'
              required
            />

            <Input
              id='confirm-password'
              name='confirm-password'
              type='password'
              label='Confirm password'
              autoComplete='new-password'
              required
            />

            <div>
              <Button type='submit' fullWidth disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
