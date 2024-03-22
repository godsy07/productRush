import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticated = false;

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
};

export default ProtectedRoutes;
