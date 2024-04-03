import { useAuth } from "@/context/AuthProvider";
import { Outlet, Navigate } from "react-router-dom";
import UserRootLayout from "../layouts/UserRootLayout";

const ProtectedUserRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        "Loading...."
      ) : (
        <>
          {!isAuthenticated ? (
            <Navigate to="/login" />
          ) : (
            <>
              <UserRootLayout>
                <Outlet />
              </UserRootLayout>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProtectedUserRoutes;
