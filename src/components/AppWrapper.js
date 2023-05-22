import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckValidty from "../PrivateRoute/CheckValid";
import Sidebar from "./SideBar";
import Unauthorized from "../pages/unauthorized";
import { useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import Header from "./Header";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

import Register from "../pages/register";
import Login from "../pages/login";
import ForgetPassword from "../pages/forget-password";
import Home from "../pages/Home";
import Profile from "../pages/profile";
import Sheets from "../pages/sheets";
import States from "../pages/states";
import Deadlins from "../pages/deadlines";
import MailConfirmation from "../pages/EmailConf";
import LandPage from "../pages/landPage";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

const AppWrapper = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                showSidebarButton={false}
                onShowSidebar={toggleSidebar}
                Page_Header="Budget Planner"
                headPosition="start"
              />
              <LandPage />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <CheckValidty>
              <Register />
            </CheckValidty>
          }
        />
        <Route
          path="/login"
          element={
            <CheckValidty>
              <Login />
            </CheckValidty>
          }
        />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/confirm-email" element={<MailConfirmation />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Box ml={!variants?.navigationButton && "15rem"}>
                <Header
                  showSidebarButton={variants?.navigationButton}
                  onShowSidebar={toggleSidebar}
                  Page_Header="Home"
                  headPosition="start"
                />
                <Home />
              </Box>
              <Sidebar
                variant={variants?.navigation}
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
              />
            </PrivateRoute>
          }
        />

        <Route
          path="/sheets"
          element={
            <PrivateRoute>
              <Box ml={!variants?.navigationButton && "15rem"}>
                <Header
                  showSidebarButton={variants?.navigationButton}
                  onShowSidebar={toggleSidebar}
                  Page_Header="Sheets"
                  headPosition="start"
                />
                <Sheets />
              </Box>
              <Sidebar
                variant={variants?.navigation}
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/states"
          element={
            <PrivateRoute>
              <Box ml={!variants?.navigationButton && "15rem"}>
                <Header
                  showSidebarButton={variants?.navigationButton}
                  onShowSidebar={toggleSidebar}
                  Page_Header="Statistics"
                  headPosition="start"
                />
                <States />
              </Box>
              <Sidebar
                variant={variants?.navigation}
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/deadlines"
          element={
            <PrivateRoute>
              <Box ml={!variants?.navigationButton && "15rem"}>
                <Header
                  showSidebarButton={variants?.navigationButton}
                  onShowSidebar={toggleSidebar}
                  Page_Header="Deadlines"
                  headPosition="start"
                />
                <Deadlins />
              </Box>
              <Sidebar
                variant={variants?.navigation}
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Box ml={!variants?.navigationButton && "15rem"}>
                <Header
                  showSidebarButton={variants?.navigationButton}
                  onShowSidebar={toggleSidebar}
                  Page_Header="Profile"
                  headPosition="start"
                />
                <Profile />
              </Box>
              <Sidebar
                variant={variants?.navigation}
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppWrapper;
