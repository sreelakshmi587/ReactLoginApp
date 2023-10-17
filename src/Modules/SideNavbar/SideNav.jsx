import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Country App
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/home" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">HomePage</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/favourites" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="star">Favourites</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/login" target="_blank" activeClassName="activeClicked" >
              <CDBSidebarMenuItem icon="signout " >Logout</CDBSidebarMenuItem>

            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>
        
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
