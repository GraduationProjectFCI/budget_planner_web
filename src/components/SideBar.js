import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  Text,
  Center,
  Divider,
  Image,
} from "@chakra-ui/react";

import Wallet from "../assets/Wallet.png";

import { Link } from "react-router-dom";

const SidebarContent = ({ onClick }) => (
  <VStack as="nav" spacing={3} align="stretch" pt={2}>
    <Link to="/home">
      <Button w="full" onClick={onClick}>
        Home
      </Button>
    </Link>

    <Link to="/sheets">
      <Button w="full" onClick={onClick}>
        Sheets
      </Button>
    </Link>

    <Link to="/states">
      <Button w="full" onClick={onClick}>
        Statistics
      </Button>
    </Link>
    <Link to="/deadlines">
      <Button w="full" onClick={onClick}>
        Deadlines
      </Button>
    </Link>
    <Link to="/profile">
      <Button w="full" onClick={onClick}>
        Profile
      </Button>
    </Link>
  </VStack>
);

const Sidebar = ({ isOpen, variant, onClose }) => {
  return variant === "sidebar" ? (
    <Box
      position="fixed"
      top={0}
      p={5}
      w="15rem"
      h="100%"
      boxShadow=" 6px 0px 10px -9px rgba(0,0,0,0.3)"
    >
      <Box pb={3}>
        <Center>
          <Image
            src={Wallet}
            alt="Wallet"
            boxSize="3rem"
            display="inline-block"
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="black"
            textAlign="center"
          >
            <Link to="/">Budget Planner</Link>
          </Text>
        </Center>
      </Box>
      <Divider
        orientation="horizontal"
        mb={3}
        w="full"
        borderColor="blackAlpha.400"
        borderStyle="solid"
      />
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            borderBottomWidth="1px"
            textAlign="center"
            color="black"
            fontSize="2xl"
            fontWeight="bold"
            p={3}
          >
            Budget Planner
          </DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
