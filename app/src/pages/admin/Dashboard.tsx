import { MdSpaceDashboard } from "react-icons/md";

import AdminPageLayout from "@/components/shared/layouts/AdminPageLayout";

const Dashboard = () => {
  return (
    <AdminPageLayout
      title="Dashboard"
      icon={<MdSpaceDashboard className="me-1" />}
    >
      <h2>Dashboard</h2>
    </AdminPageLayout>
  );
};

export default Dashboard;
