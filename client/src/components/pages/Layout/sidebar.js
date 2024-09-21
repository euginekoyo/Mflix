import React from "react";
import styled from "styled-components";
import { RiAdminFill } from "react-icons/ri";
import {
  FaBars,
  FaHome,
  FaFilm,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext"; // Ensure this is the correct path

const SidebarWrapper = styled.div`
  width: ${({ isVisible }) => (isVisible ? "130px" : "80px")};
  height: 100vh;
  background: ${({ isVisible }) =>
    isVisible
      ? "linear-gradient(135deg, red, white)"
      : "linear-gradient(135deg, red, blue)"};
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transform: ${({ isVisible }) =>
    isVisible ? "translateX(0)" : "translateX(0)"};
  transition: transform 0.3s ease, width 0.3s ease;
  font-family: "Dancing Script", cursive;
  padding-top: 60px;
`;

const ToggleButton = styled.div`
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000; /* Ensure it is higher than the Sidebar's z-index */
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  font-family: "Dancing Script", cursive;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease, padding-left 0.3s ease;
margin-left:10px;
  svg {
    font-size: 1.5rem;
    margin-right: ${({ isVisible }) => (isVisible ? "10px" : "0")};
  }

  span {
    display: ${({ isVisible }) => (isVisible ? "inline" : "none")};
  }

  &:hover {
    background-color: #333;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  font-family: "Dancing Script", cursive;
  background: none;
  border: none;
  margin-left:10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  svg {
    font-size: 1.5rem;
    margin-right: ${({ isVisible }) => (isVisible ? "10px" : "0")};
  }

  span {
    display: ${({ isVisible }) => (isVisible ? "inline" : "none")};
  }

  &:hover {
    // background-color: #333;
    // Stransition: background-color 0.3s ease, padding-left 0.3s ease;
  }
`;

const Sidebar = ({ isVisible, toggleSidebar }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <>
      <SidebarWrapper isVisible={isVisible}>
        {isAuthenticated && (
          <>
            <SidebarItem to="/dashboard" isVisible={isVisible}>
              <FaHome />
              {isVisible && <span>Home</span>}
            </SidebarItem>
            <SidebarItem to="/movielist" isVisible={isVisible}>
              <FaFilm />
              {isVisible && <span>Movies</span>}
            </SidebarItem>

            {isAdmin && isAuthenticated && (
              <SidebarItem to="/admin" isVisible={isVisible}>
                <RiAdminFill />
                {isVisible && <span>Admin</span>}
              </SidebarItem>
            )}
            <LogoutButton onClick={handleLogout} isVisible={isVisible}>
              <FaSignOutAlt />
              {isVisible && <span>Logout</span>}
            </LogoutButton>
          </>
        )}
        {!isAuthenticated && !isAdmin && (
          <>
            <SidebarItem to="/dashboard" isVisible={isVisible}>
              <FaFilm />
              {isVisible && <span>Home</span>}
            </SidebarItem>
            <SidebarItem to="/authForm" isVisible={isVisible}>
              <FaSignInAlt />
              {isVisible && <span>Login</span>}
            </SidebarItem>
          </>
        )}
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
