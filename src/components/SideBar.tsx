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

import LabelsButton from "./Labels";

import { Link } from "react-router-dom";

interface SidebarContentProps {
  onClick: () => void;
  triggerAction: boolean;
  setTriggerAction: (value: boolean) => void;
  labels: string[];
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  onClick,
  triggerAction,
  setTriggerAction,
  labels,
}) => (
  <VStack as="nav" spacing={3} align="stretch" pt={2}>
    <Link to="/home">
      <Button colorScheme={"teal"} w="full" onClick={onClick}>
        Home
      </Button>
    </Link>

    <Link to="/sheets">
      <Button colorScheme={"teal"} w="full" onClick={onClick}>
        Sheets
      </Button>
    </Link>

    <Link to="/states">
      <Button w="full" colorScheme={"teal"} onClick={onClick}>
        Statistics
      </Button>
    </Link>
    <Link to="/deadlines">
      <Button w="full" colorScheme={"teal"} onClick={onClick}>
        Deadlines
      </Button>
    </Link>
    <Link to="/profile">
      <Button w="full" colorScheme={"teal"} onClick={onClick}>
        Profile
      </Button>
    </Link>

    <LabelsButton
      triggerAction={triggerAction}
      setTriggerAction={setTriggerAction}
      labels={labels}
    />
  </VStack>
);

interface SidebarProps {
  isOpen: boolean;
  variant: "sidebar" | "drawer";
  onClose: () => void;
  triggerAction: boolean;
  setTriggerAction: (value: boolean) => void;
  labels: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  variant,
  onClose,
  triggerAction,
  setTriggerAction,
  labels,
}) => {
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
          <Link to="/">
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Budget Planner
            </Text>
          </Link>
        </Center>
      </Box>
      <Divider
        orientation="horizontal"
        mb={3}
        w="full"
        borderColor="blackAlpha.400"
        borderStyle="solid"
      />
      <SidebarContent
        onClick={onClose}
        triggerAction={triggerAction}
        setTriggerAction={setTriggerAction}
        labels={labels}
      />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            borderBottomWidth="1px"
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
            p={3}
          >
            Budget Planner
          </DrawerHeader>
          <DrawerBody>
            <SidebarContent
              onClick={onClose}
              triggerAction={triggerAction}
              setTriggerAction={setTriggerAction}
              labels={labels}
            />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
