import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaFilter } from "react-icons/fa";

import { useGetCategoryFilters } from "@/utils/react-query/queries";

import { Checkbox } from "@/components/ui/checkbox";
import Datatable from "@/components/shared/Datatable/Datatable";
import AdminPageLayout from "@/components/shared/layouts/AdminPageLayout";

export type Category = {
  _id: string;
  name: string;
  image_url: string;
  parent?: string;
};

export type CategoryFilterProps = {
  _id: string;
  filters: string[];
  category: Category;
};

const Filters = () => {
  const { data: filters } = useGetCategoryFilters();

  const columns: ColumnDef<CategoryFilterProps>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "category",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.category.name}</div>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <img src={row.original.category.image_url} className="max-h-16" />
      ),
    },
    {
      accessorKey: "filters",
      header: "Image",
      cell: ({ row }) => <div>{row.original.filters.join(", ")}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <FaEdit onClick={() => console.log(row.original._id)} />
        </div>
      ),
    },
  ];

  return (
    <AdminPageLayout title="Filters" icon={<FaFilter className="me-1" />}>
      <div className="flex justify-end mb-3"></div>

      {filters && <Datatable columns={columns} data={filters} />}
    </AdminPageLayout>
  );
};

export default Filters;
