import { MdCategory } from "react-icons/md";

import AdminPageLayout from "@/components/shared/layouts/AdminPageLayout";

const Categories = () => {
  return (
    <AdminPageLayout title="Categories" icon={<MdCategory className="me-1" />}>
      <h2>Categories</h2>
    </AdminPageLayout>
  );
};

export default Categories;
