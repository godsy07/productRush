import {
  ColumnDef,
} from "@tanstack/react-table";
import { FaEdit } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

import { Checkbox } from "@/components/ui/checkbox";
import { useGetCategories } from "@/utils/react-query/queries";
import AdminPageLayout from "@/components/shared/layouts/AdminPageLayout";
import AddCategory from "@/components/shared/AddCategory/AddCategory";
import Datatable from "@/components/shared/Datatable/Datatable";

export type CategoryProps = {
  _id: string;
  name: string;
  image_url: string;
};

const Categories = () => {
  const { data: categories } = useGetCategories();

  const handleEditCategory = (category_id: string) => {
    console.log("category_id: ", category_id);
  }

  const columns: ColumnDef<CategoryProps>[] = [
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
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "image_url",
      header: "Image",
      cell: ({ row }) => <img src={row.getValue("image_url")} className="max-h-16" />,
    },
    {
      id: "_id",
      header: "Actions",
      cell: ({ row }) => <div><FaEdit onClick={() => handleEditCategory(row.original._id)} /></div>,
    },
  ];

  return (
    <AdminPageLayout title="Categories" icon={<MdCategory className="me-1" />}>
      <div className="flex justify-end mb-3">
        <AddCategory />
      </div>

      {categories && <Datatable columns={columns} data={categories} />}
    </AdminPageLayout>
  );
};

export default Categories;
