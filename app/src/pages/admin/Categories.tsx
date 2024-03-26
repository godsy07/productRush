import { MdCategory } from "react-icons/md";

import { useGetCategories } from "@/utils/react-query/queries";
import AdminPageLayout from "@/components/shared/layouts/AdminPageLayout";
import AddCategory from "@/components/shared/AddCategory/AddCategory";

const Categories = () => {
  const { data: categories } = useGetCategories();

  return (
    <AdminPageLayout title="Categories" icon={<MdCategory className="me-1" />}>
      <div className="flex justify-end">
        <AddCategory />
      </div>
      <h2>Categories</h2>
      <div>
        {categories && categories.map((item:any) => (
          <div key={item._id}>Name: {item.name}, Image: {item.image_url}</div>
        ))}
      </div>
    </AdminPageLayout>
  );
};

export default Categories;
