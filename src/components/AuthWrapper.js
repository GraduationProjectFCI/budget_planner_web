import { Container, Center, Text, Box } from "@chakra-ui/react";

export const AuthWrapper = (props) => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container>
        <Box bgColor="#ffffff" p={12} rounded={8}>
          <Center>
            <Text fontSize="2.2rem" p={3}>
              {props.header}
            </Text>
          </Center>
          {props.children}
        </Box>
      </Container>
    </Box>
  );
};
