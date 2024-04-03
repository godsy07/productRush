import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "@/context/AuthProvider";

import Spinner from "../Spinner/Spinner";
import UserRootLayout from "../layouts/UserRootLayout";

const ProtectedUserRoutes = () => {
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
            <Navigate to="/login" />
          ) : authUser?.role === "admin" ? (
            <Navigate to="/dashboard" />
          ) : (
            <UserRootLayout>
              <Outlet />
            </UserRootLayout>
          )}
        </>
      )}
    </>
  );
};

export default ProtectedUserRoutes;
