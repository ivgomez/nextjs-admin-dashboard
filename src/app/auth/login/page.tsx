"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/atoms/Input";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Button } from "@/components/atoms/Button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to login");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>Sign in to your account</h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{" "}
          <Link href='/auth/register' className='font-medium text-indigo-600 hover:text-indigo-500'>
            create a new account
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
            <Input id='email' name='email' type='email' label='Email address' autoComplete='email' required />

            <Input
              id='password'
              name='password'
              type='password'
              label='Password'
              autoComplete='current-password'
              required
            />

            <div className='flex items-center justify-between'>
              <Checkbox id='remember-me' name='remember-me' label='Remember me' />

              <div className='text-sm'>
                <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button type='submit' fullWidth disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
