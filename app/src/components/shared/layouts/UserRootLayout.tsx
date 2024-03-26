import React from "react";
import { Outlet } from "react-router-dom";

const UserRootLayout = () => {
  return (
    <div className="h-dvh bg-blue-600">
      <div>User Header</div>
      <div className=" bg-orange-500 h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default UserRootLayout;
