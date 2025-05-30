import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/atoms/Input";

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search..." }) => {
  return (
    <div className='relative'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
      </div>
      <Input
        type='search'
        name='search'
        id='search'
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className='pl-10'
      />
    </div>
  );
};
