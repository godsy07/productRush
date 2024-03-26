import { FaUser } from "react-icons/fa";

import AdminPageLayout from "@/components/shared/layouts/AdminPageLayout";

const MyProfile = () => {
  return (
    <AdminPageLayout title="My Profile" icon={<FaUser className="me-1" />}>
      <h2>My Profile</h2>
    </AdminPageLayout>
  );
};

export default MyProfile;
