import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./sidebar";
import Topbar from "./Topbar";
import { Route, Routes } from "react-router-dom";
import MovieList from "../movieList";
import Dashboard from "../admin/Adashboard"; // Import Dashboard if needed
import LandingPage from "../landingPage";
import MovieDetails from "../MDetails";
import ProtectedRoute from "./../../protectedRoute";
import ADashboard from "../admin/Adashboard";
import Admin from "../admin";

const PageWrapper = styled.div`
  transition: filter 0.3s ease;
  /* Apply blur to the entire page */
`;

const MainContent = styled.div`
  margin-left: ${({ isSidebarVisible }) =>
    isSidebarVisible ? "100px" : "50px"};
  margin-right: 0; /* Add right margin */
  padding-top: 20px; /* Same height as Topbar */
  padding-bottom: 0; /* Optional: Add some padding at the bottom */
  transition: margin-left 0.3s ease;
  filter: ${({ isSidebarVisible }) =>
    isSidebarVisible ? "blur(3px)" : "none"};
`;

const AppLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <PageWrapper isSidebarVisible={sidebarVisible}>
      <Sidebar isVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
        <Topbar toggleSidebar={toggleSidebar} />
        <MainContent isSidebarVisible={sidebarVisible}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/movielist" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route
              path="/Adashboard"
              element={
                <ProtectedRoute>
                  <ADashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MainContent>
      </PageWrapper>
    </>
  );
};

export default AppLayout;
