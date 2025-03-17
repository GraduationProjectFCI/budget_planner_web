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
import { ColorModeSwitcher } from "../chakra/ColorModeSwitcher";

interface HeaderProps {
  showSidebarButton?: boolean;
  onShowSidebar?: () => void;
  Page_Header?: React.ReactNode;
  headPosition?: string;
  showName?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showSidebarButton = true,
  onShowSidebar,
  Page_Header,
  headPosition,
  showName,
}) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean | undefined>();
  const [userName, setUserName] = useState<string | undefined>();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setLoggedIn(true);
      const userData = localStorage.getItem("userData");
      const value = JSON.parse(userData || "{}");

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
    return (
      <Center>
        <Spinner emptyColor="gray.200" color="teal.500" size="lg" />
      </Center>
    );
  }

  return (
    <Flex p={2} justifyContent="center" alignItems="center">
      <Box pe={2}>
        {showSidebarButton && (
          <IconButton
            variant="transparent"
            icon={<GoThreeBars size="1.5rem" />}
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
      <HStack>
        <ColorModeSwitcher
          justifySelf="flex-end"
          justifyItems="flex-end"
          justify="flex-end"
          alignSelf="flex-end"
        />
        {isLoggedIn ? (
          <HStack>
            <Link to="/home">
              <Button size="sm" colorScheme={"teal"}>
                Go to Home
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="sm"
                colorScheme={"teal"}
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
              <Button size="sm" colorScheme={"teal"}>
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button size="sm" colorScheme={"teal"}>
                Register
              </Button>
            </Link>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
};

export default Header;
