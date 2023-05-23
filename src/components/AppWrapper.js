import { useState, useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckValidty from "../PrivateRoute/CheckValid";
import Sidebar from "./SideBar";
import Unauthorized from "../pages/unauthorized";
import {
  useBreakpointValue,
  Image,
  Text,
  Center,
  Container,
} from "@chakra-ui/react";
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
import Deadlines from "../pages/deadlines";
import MailConfirmation from "../pages/EmailConf";
import LandPage from "../pages/landPage";

import Wallet from "../assets/Wallet.png";

import http from "../connection/connect";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

const AppWrapper = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [triggerAction, setTriggerAction] = useState(false);

  const [labels, setLabels] = useState();

  useEffect(() => {
    const getUserLabels = async () => {
      const response = await http.get("/app/labels", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData"))?.token
          }`,
        },
      });
      setLabels(response.data.data);
    };

    if (!triggerAction) getUserLabels();

    if (triggerAction !== false) setTriggerAction(false);
  }, [triggerAction]);

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
                showName={false}
                Page_Header={
                  <Center>
                    <Image
                      src={Wallet}
                      alt="Wallet"
                      boxSize="2.5rem"
                      display="inline-block"
                    />
                    <Text as="span" fontSize="lg" fontWeight="bold">
                      Welcome to Budget Planner
                    </Text>
                  </Center>
                }
                headPosition="start"
              />
              <Container maxW="container.xl">
                <LandPage />
              </Container>
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
                  showName={true}
                  showSidebarButton={variants?.navigationButton}
                  onShowSidebar={toggleSidebar}
                  Page_Header={
                    <Text as="span" fontSize="lg" fontWeight="bold">
                      Hello
                    </Text>
                  }
                  headPosition="start"
                />
                <Container maxW="container.xl">
                  <Home
                    triggerAction={triggerAction}
                    setTriggerAction={setTriggerAction}
                    labels={labels}
                  />
                </Container>
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
                  showName={true}
                  showSidebarButton={variants?.navigationButton}
                  onShowSidebar={toggleSidebar}
                  Page_Header={
                    <Text as="span" fontSize="lg" fontWeight="bold">
                      Here is your Sheets,
                    </Text>
                  }
                  headPosition="start"
                />
                <Container maxW="container.xl">
                  <Sheets
                    triggerAction={triggerAction}
                    setTriggerAction={setTriggerAction}
                    labels={labels}
                  />
                </Container>
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
                  showName={true}
                  showSidebarButton={variants?.navigationButton}
                  onShowSidebar={toggleSidebar}
                  Page_Header={
                    <Text as="span" fontSize="lg" fontWeight="bold">
                      Here is your Statistics,
                    </Text>
                  }
                  headPosition="start"
                />
                <Container maxW="container.xl">
                  <States />
                </Container>
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
                  showName={true}
                  showSidebarButton={variants?.navigationButton}
                  onShowSidebar={toggleSidebar}
                  Page_Header={
                    <Text as="span" fontSize="lg" fontWeight="bold">
                      Here set deadlines for your bills,
                    </Text>
                  }
                  headPosition="start"
                />
                <Container maxW="container.xl">
                  <Deadlines
                    triggerAction={triggerAction}
                    setTriggerAction={setTriggerAction}
                    labels={labels}
                  />
                </Container>
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
                  showName={true}
                  showSidebarButton={variants?.navigationButton}
                  onShowSidebar={toggleSidebar}
                  Page_Header={
                    <Text as="span" fontSize="lg" fontWeight="bold">
                      Finally, It's your profile,
                    </Text>
                  }
                  headPosition="start"
                />
                <Container maxW="container.xl">
                  <Profile
                    triggerAction={triggerAction}
                    setTriggerAction={setTriggerAction}
                  />
                </Container>
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
