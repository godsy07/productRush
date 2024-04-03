import { useAuth } from "@/context/AuthProvider";
import { Outlet, Navigate } from "react-router-dom";
import AdminRootLayout from "../layouts/AdminRootLayout";

const ProtectedAdminRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        "Loading...."
      ) : (
        <>
          {!isAuthenticated ? (
            <Navigate to="/admin-login" />
          ) : (
            <>
              <AdminRootLayout>
                <Outlet />
              </AdminRootLayout>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProtectedAdminRoutes;
