import { Box, Center, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      p={4}
      textAlign="center"
      justifyContent="center"
    >
      <Center>
        <Spinner color="teal.500" size="lg" />
      </Center>
    </Box>
  );
};

export default Loader;
