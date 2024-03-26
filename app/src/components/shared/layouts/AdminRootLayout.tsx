import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { FaFilter, FaUser   } from 'react-icons/fa';
import { ImExit  } from 'react-icons/im';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSpaceDashboard, MdCategory  } from "react-icons/md";

import NavLinkTab from "./NavLinkTab";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const navLinksArray = [
  { to: "/dashboard", title: "Dashboard", icon: <MdSpaceDashboard className="me-1" /> },
  { to: "/categories", title: "Categories", icon: <MdCategory className="me-1" /> },
  { to: "/category-filters", title: "Filters", icon: <FaFilter className="me-1" /> },
  { to: "/my-profile", title: "My Profile", icon: <FaUser className="me-1" /> },
];

const AdminRootLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    const confirmLogout = await Swal.fire({
      icon: 'warning',
      title: 'Wait',
      text: 'Are your sure, you want to logout?',
      confirmButtonText: 'Yes, I am',
      showCancelButton: true,
    });
    if (!confirmLogout.isConfirmed) return;
    logout();
    navigate("/admin-login");
    toast({
      title: "success",
      variant: "success",
      description: "You have been logged out.",
    });
  };

  return (
    <div className="flex flex-col w-100">
      <div className="w-100 bg-sky-200 px-3 py-5 flex justify-between">
        <Link to="/dashboard">
          <h2>ProductRush</h2>
        </Link>
        <div className="block md:hidden lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><GiHamburgerMenu/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Dashboard
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="admin-content flex w-100">
        <div className="hidden md:flex lg:flex flex-col gap-1 px-2 py-4 h-full w-1/4 lg:w-1/6 bg-purple-800 overflow-x-hidden overflow-y-scroll">
          {navLinksArray.map((item, index) => (
            <NavLinkTab key={index} {...item} />
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center text-left border border-3 p-2 bg-blue-800 border-blue-400 text-white w-full rounded-md font-medium hover:bg-red-400 hover:border-gray-100"
          >
            <ImExit className="me-1"/>Logout
          </button>
        </div>

        <div className=" bg-white w-full p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminRootLayout;
