import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  icon: ReactNode;
}

const AdminPageLayout: React.FC<Props> = ({ children, title='', icon='' }) => {
  return (
    <div className="px-2 py-3">
      <h2 className="flex items-center font-bold text-3xl mb-2 px-1 py-2 border border-x-0 border-t-0 border-b-3 border-slate-600">{icon}{title}</h2>
      {children}
    </div>
  );
};

export default AdminPageLayout;
