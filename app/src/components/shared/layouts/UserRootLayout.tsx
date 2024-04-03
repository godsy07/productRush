import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UserRootLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-dvh bg-blue-600">
      <div>User Header</div>
      <div className=" bg-orange-500 h-full w-full">{children}</div>
    </div>
  );
};

export default UserRootLayout;
