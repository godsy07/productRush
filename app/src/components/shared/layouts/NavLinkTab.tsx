import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  title: string;
}

const NavLinkTab: React.FC<Props> = ({ to = "/", title = "" }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (`w-full rounded-md p-2 font-medium text-white border border-3 ${isActive ? "bg-blue-600 border-gray-100" : "bg-blue-800 border-blue-600"}`)}
    >
      {title}
    </NavLink>
  );
};

export default NavLinkTab;
