import { FaUser } from "react-icons/fa";

import AdminPageLayout from "@/components/shared/layouts/AdminPageLayout";
import { useGetCurrentUser } from "@/utils/react-query/queries";
import Spinner from "@/components/shared/Spinner/Spinner";

const MyProfile = () => {
  const { data: user, isLoading } = useGetCurrentUser();
  return (
    <AdminPageLayout title="My Profile" icon={<FaUser className="me-1" />}>
      {isLoading ? (
        <div className="flex">
        <div className="w-20 h-20">
          <Spinner />
        </div>
      </div>
      ) : (
        <div>
          <h2 className="font-regular text-xl">Hello, {user.first_name}</h2>
          {/* first_name, last_name, email(cannot be edited), phone_no, role(cannot be edited), _id(cannot be edited) */}
        </div>
      )}
    </AdminPageLayout>
  );
};

export default MyProfile;
