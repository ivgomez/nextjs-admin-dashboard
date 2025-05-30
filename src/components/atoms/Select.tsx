interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export function Select({
  id,
  name,
  label,
  options,
  value,
  defaultValue,
  required,
  className = "",
  onChange,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        required={required}
        onChange={(e) => onChange?.(e.target.value)}
        className={`mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
