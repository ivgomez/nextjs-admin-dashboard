import { Button } from "@/components/atoms/Button";
import { Column } from "@/components/molecules/Table";

export interface ContentItem {
  id: number;
  title: string;
  type: string;
  status: string;
  lastUpdated: string;
}

export function createContentColumns(
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
  loading: boolean
): Column<ContentItem>[] {
  return [
    {
      header: "Title",
      accessor: (item) => item.title,
      className: "font-medium text-gray-900",
    },
    {
      header: "Type",
      accessor: (item) => item.type,
    },
    {
      header: "Status",
      accessor: (item) => (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            item.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Last Updated",
      accessor: (item) => item.lastUpdated,
    },
    {
      header: "",
      accessor: (item) => (
        <div className='text-right'>
          <Button variant='secondary' size='sm' onClick={() => handleEdit(item.id)}>
            Edit
          </Button>
          <Button variant='danger' size='sm' className='ml-4' onClick={() => handleDelete(item.id)} disabled={loading}>
            Delete
          </Button>
        </div>
      ),
      className: "relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0",
    },
  ];
}
