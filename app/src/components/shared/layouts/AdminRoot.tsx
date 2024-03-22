import { Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const AdminRoot = () => {
  return (
    <div className="flex flex-col w-100">
      <div className="w-100 bg-sky-200 px-3 py-5 flex justify-between">
        <Link to='/'>
          <h2>Logo</h2>
        </Link>
        <div className='block md:hidden lg:hidden'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger><GiHamburgerMenu /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <li>
                      <NavigationMenuLink>
                        <a href="/login">test</a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="admin-content flex w-100">
        <div className="hidden md:flex lg:flex flex-col gap-2 px-2 py-2 h-full w-1/4 lg:w-1/6 bg-purple-800 overflow-x-hidden overflow-y-scroll">
          <div className="bg-red-100 rounded-md p-2">item 1</div>
          <div className="bg-blue-500 rounded-md p-2">item 2</div>
        </div>

        <div className=" bg-orange-500 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminRoot;
