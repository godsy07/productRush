import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "@/context/AuthProvider";

import Spinner from "../Spinner/Spinner";
import AdminRootLayout from "../layouts/AdminRootLayout";

const ProtectedAdminRoutes = () => {
  const { authUser, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center mt-20">
          <div className="w-24">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          {!authUser ? (
            <Navigate to="/admin-login" />
          ) : authUser.role !== "admin" ? (
            <Navigate to="/" />
          ) : (
            <AdminRootLayout>
              <Outlet />
            </AdminRootLayout>
          )}
        </>
      )}
    </>
  );
};

export default ProtectedAdminRoutes;
