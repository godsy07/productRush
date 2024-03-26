import { FaFilter } from "react-icons/fa";

import AdminPageLayout from "@/components/shared/layouts/AdminPageLayout";

const Filters = () => {
  return (
    <AdminPageLayout title="Filters" icon={<FaFilter className="me-1" />}>
      <h2>Filters</h2>
    </AdminPageLayout>
  );
};

export default Filters;
