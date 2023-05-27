import { useEffect, useState } from "react";

import {
  Box,
  IconButton,
  Flex,
  Spacer,
  HStack,
  Button,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";

import { GoThreeBars } from "react-icons/go";
import { Link } from "react-router-dom";

const Header = ({
  showSidebarButton = true,
  onShowSidebar,
  Page_Header,
  headPosition,
  showName,
}) => {
  const [isLoggedIn, setLoggedIn] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setLoggedIn(true);
      const userData = localStorage.getItem("userData");
      const value = JSON.parse(userData);

      const first_name = value.user.name.split(" ")[0];
      if (first_name) {
        setUserName(first_name);
      } else {
        setUserName(value.user.name);
      }
    } else {
      setLoggedIn(false);
    }
  }, []);

  if (!userName) {
    <Center>
      <Spinner emptyColor="gray.200" color="teal.500" size="lg" />
    </Center>;
  }
  return (
    <Flex p={2} color="black" justifyContent="center" alignItems="center">
      <Box pe={2}>
        {showSidebarButton && (
          <IconButton
            variant="transparent"
            icon={<GoThreeBars size="1.5rem" color="black" />}
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Box textAlign={headPosition}>
        {Page_Header}
        {showName && (
          <Text as="span" fontSize="lg" fontWeight="bold">
            {userName ? `${" "} ${userName}` : null}
          </Text>
        )}
      </Box>

      <Spacer />
      <Box>
        {isLoggedIn ? (
          <HStack>
            <Link to="/home">
              <Button size="sm">Go to Home</Button>
            </Link>
            <Link to="/login">
              <Button
                size="sm"
                onClick={async () => {
                  await localStorage.removeItem("userData");
                  await localStorage.removeItem("resData");
                }}
              >
                Logout
              </Button>
            </Link>
          </HStack>
        ) : (
          <HStack as="nav" spacing={3}>
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>

            <Link to="/register">
              <Button size="sm">Register</Button>
            </Link>
          </HStack>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
