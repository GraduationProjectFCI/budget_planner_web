import { Box, IconButton, Text, Flex } from "@chakra-ui/react";
import { GoThreeBars } from "react-icons/go";

const Header = ({ showSidebarButton = true, onShowSidebar, Page_Header }) => {
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
      <Box flex="1" textAlign="start">
        <Text fontSize="lg" fontWeight="bold">
          {Page_Header}
        </Text>
      </Box>

      <Box flex="1" />
    </Flex>
  );
};

export default Header;
