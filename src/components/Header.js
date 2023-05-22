import { useEffect, useState } from "react";

import {
  Box,
  IconButton,
  Text,
  Flex,
  Spacer,
  HStack,
  Button,
  Spinner,
  Center,
} from "@chakra-ui/react";

import { GoThreeBars } from "react-icons/go";

import { Link } from "react-router-dom";

const Header = ({
  showSidebarButton = true,
  onShowSidebar,
  Page_Header,
  headPosition,
}) => {
  const [isLoggedIn, setLoggedIn] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setLoggedIn(true);
      const userData = localStorage.getItem("userData");
      const value = JSON.parse(userData);
      setUserData(value);
    } else {
      setLoggedIn(false);
    }
  }, []);

  if (!userData) {
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Center>;
  }

  return (
    <Flex
      p={4}
      color="black"
      justifyContent="center"
      alignItems="center"
      boxShadow="base"
      bg="white"
    >
      <Box pe={2}>
        {showSidebarButton && (
          <IconButton
            variant="transparent"
            icon={<GoThreeBars size="1.5rem" color="black" />}
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Box textAlign={headPosition} w="100%">
        <Text fontSize="lg" fontWeight="bold">
          {Page_Header}
        </Text>
      </Box>

      <Spacer />
      <Box>
        {isLoggedIn ? (
          <HStack as="nav" spacing={3} align="stretch">
            <Button>
              <Link to="/profile">{userData.user.name}</Link>
            </Button>
            <Button>
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("userData");
                  localStorage.removeItem("resData");
                }}
              >
                Logout
              </Link>
            </Button>
          </HStack>
        ) : (
          <HStack as="nav" spacing={3} align="stretch">
            <Button>
              <Link to="/login">Login</Link>
            </Button>

            <Button>
              <Link to="/login">Register</Link>
            </Button>
          </HStack>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
