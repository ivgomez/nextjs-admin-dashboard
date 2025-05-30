import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  initialData?: UserFormData;
  loading?: boolean;
}

export interface UserFormData {
  name: string;
  email: string;
  role: string;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData, loading = false }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: UserFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <Input id='name' name='name' type='text' label='Full Name' defaultValue={initialData?.name} required />

      <Input id='email' name='email' type='email' label='Email Address' defaultValue={initialData?.email} required />

      <div>
        <label htmlFor='role' className='block text-sm font-medium leading-6 text-gray-900'>
          Role
        </label>
        <select
          id='role'
          name='role'
          defaultValue={initialData?.role || "user"}
          className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
        >
          <option value='user'>User</option>
          <option value='admin'>Admin</option>
        </select>
      </div>

      <div>
        <Button type='submit' fullWidth disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
};
