import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

const Home = () => {
  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };
  return (
    <div className="flex">
      <Sidebar className="h-[100vh] sticky top-0 left-0">
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem onClick={logout}>logout</MenuItem>
        </Menu>
      </Sidebar>
      <div className="bg-slate-800 w-full h-[1000px]">
        <button
          onClick={() => {
            return toggleSidebar();
          }}
        >
          toggle
        </button>
        <button
          onClick={() => {
            return collapseSidebar();
          }}
        >
          collapse
        </button>
      </div>
    </div>
  );
};

export default Home;
