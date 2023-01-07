import React from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

const Home = () => {
  const { collapseSidebar } = useProSidebar();
  return (
    <>
      <Sidebar>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
      <button
        onClick={() => {
          collapseSidebar();
        }}
      >
        collapse
      </button>
    </>
  );
};

export default Home;
