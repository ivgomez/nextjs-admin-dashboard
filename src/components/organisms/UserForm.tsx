import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { Select } from "@/components/atoms/Select";

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

      <Select
        id='role'
        name='role'
        label='Role'
        defaultValue={initialData?.role || "user"}
        options={[
          { value: "user", label: "User" },
          { value: "admin", label: "Admin" },
        ]}
      />

      <div>
        <Button type='submit' fullWidth disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
};
