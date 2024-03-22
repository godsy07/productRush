import { useAuth } from "@/context/AuthProvider";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
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
              <Outlet />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProtectedRoutes;
