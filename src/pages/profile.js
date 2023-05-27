import {
  Button,
  Center,
  Image,
  Card,
  CardBody,
  Text,
  Container,
  HStack,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";

import http from "../connection/connect";

import { useState } from "react";

import Loader from "../components/Loader";

import PIP from "../assets/OIP.jpeg";

import CustomModal from "../modals/customModal";

const Profile = ({ triggerAction, setTriggerAction, user }) => {
  const toast = useToast();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [name, setName] = useState();
  const [budget, setBudget] = useState();
  const [currency, setCurrency] = useState();

  const [isOpen, setIsOpen] = useState(false);

  // modal handlers
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setError("");
    setIsOpen(false);
  };

  const handleUpdateUserData = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userData = JSON.parse(localStorage.getItem("userData"));
    http
      .patch(
        "/app/profile",
        { name, budget, currency },
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setTriggerAction(true);
          setLoading(false);

          toast({
            title: "Success",
            description: response.data.msg,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errorLog
        ) {
          setError(error.response.data.errorLog);
          setLoading(false);
        }
      });
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        closeModal={closeModal}
        title="Update Profile"
        size="md"
      >
        <form onSubmit={handleUpdateUserData}>
          <FormControl id="name" isRequired mb={3}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="budget" isRequired mb={3}>
            <FormLabel>Budget</FormLabel>
            <Input
              placeholder="Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </FormControl>

          <FormControl id="currency" isRequired mb={3}>
            <FormLabel>Currency</FormLabel>
            <Input
              placeholder="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </FormControl>

          <Text color="red.500">{error}</Text>

          <HStack justifyContent="end" alignItems="center">
            <Button type="submit" isLoading={isLoading}>
              Update
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </HStack>
        </form>
      </CustomModal>
      <Container maxW="container.md">
        <Center>
          <Image
            src={PIP}
            alt="profile image"
            boxSize="25rem"
            borderRadius="full"
            m={5}
            mt={10}
          />
        </Center>

        <Flex p={4} color="black" justifyContent="center" alignItems="center">
          <Text as="span" fontSize="lg" fontWeight="semibold" color="black">
            Your Data
          </Text>

          <Spacer />
          <Box>
            <Button
              size="sm"
              onClick={() => {
                setName(user.name);
                setBudget(user.budget);
                setCurrency(user.currency);

                openModal();
              }}
            >
              Update Your Data
            </Button>
          </Box>
        </Flex>

        <Card boxShadow="md" borderRadius="md" m={3}>
          <CardBody>
            <Text fontWeight="semibold" fontSize={"2xl"}>
              Name : {user.name}
            </Text>
          </CardBody>
        </Card>

        <Card boxShadow="md" borderRadius="md" m={3}>
          <CardBody>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="semibold" fontSize={"2xl"}>
                Email : {user.email}
              </Text>
            </HStack>
          </CardBody>
        </Card>

        <Card boxShadow="md" borderRadius="md" m={3}>
          <CardBody>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="semibold" fontSize={"2xl"}>
                Gender : {user.gender}
              </Text>
            </HStack>
          </CardBody>
        </Card>

        <Card boxShadow="md" borderRadius="md" m={3}>
          <CardBody>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="semibold" fontSize={"2xl"}>
                Budget : {user.budget}
              </Text>
            </HStack>
          </CardBody>
        </Card>

        <Card boxShadow="md" borderRadius="md" m={3}>
          <CardBody>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="semibold" fontSize={"2xl"}>
                Currency : {user.currency}
              </Text>
            </HStack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
