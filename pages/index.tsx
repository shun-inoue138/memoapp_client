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
import useUserStore from "../src/stores/useUserStore";

const Home = () => {
  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const router = useRouter();
  const { currentUser, resetCurrentUser } = useUserStore((state) => {
    return {
      currentUser: state.currentUser,
      resetCurrentUser: state.resetCurrentUser,
    };
  });
  const logout = () => {
    localStorage.removeItem("token");
    resetCurrentUser();
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
        {currentUser.id !== 0 ? (
          <div>{currentUser.username}さんようこそ</div>
        ) : (
          <div>ななしさんようこそ</div>
        )}
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
