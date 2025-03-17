import { useState, useEffect } from "react";

import {
  Box,
  VStack,
  Flex,
  Text,
  useToast,
  Center,
  Card,
  CardBody,
  Spinner,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";

import http from "../connection/connect";

import { DeleteIcon } from "@chakra-ui/icons";
import CustomModal from "../modals/customModal";

interface Deadline {
  _id: string;
  deadline_name: string;
  deadline_date: string;
  deadline_value: number;
  created_at: string;
}

interface User {
  currency: string;
}

interface DeadlineListProps {
  triggerAction: boolean;
  setTriggerAction: (value: boolean) => void;
  user: User;
  labels?: any;
}

const DeadlineList: React.FC<DeadlineListProps> = ({
  triggerAction,
  setTriggerAction,
  user,
  labels,
}) => {
  const toast = useToast();
  const [deadlines, setDeadLines] = useState<Deadline[] | undefined>();
  const [selectedDeadline, setDeadline] = useState<Deadline | undefined>();

  //form state
  const [deadline_name, setName] = useState<string | undefined>();
  const [deadline_date, setDate] = useState<string | undefined>();
  const [deadline_value, setValue] = useState<number | undefined>();

  const [error, setError] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // modal handlers
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setError("");
    setIsOpen(false);
  };

  useEffect(() => {
    const getUserDeadlines = () => {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      http
        .get("/app/deadlines", {
          headers: { Authorization: `Bearer ${userData?.token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setDeadLines(response.data.data);
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errorLog
          ) {
            toast({
              title: "Error",
              description: error.response.data.errorLog,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        });
    };

    if (!triggerAction) getUserDeadlines();

    if (triggerAction !== false) setTriggerAction(false);
  }, [triggerAction, setTriggerAction, toast]);

  const handleDeadLinesDelete = async (deadline_id: string) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const response = await http.delete(`/app/deadlines/${deadline_id}`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });

      if (response.status === 200) {
        setTriggerAction(true);
        toast({
          title: "Success",
          description: response.data.msg,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorLog
      ) {
        toast({
          title: "Error",
          description: error.response.data.msg,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const handleUpdatingDeadline = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const response = await http.patch(
        `/app/deadlines/${selectedDeadline?._id}`,
        {
          deadline_name,
          deadline_date,
          deadline_value,
        },
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        setTriggerAction(true);
        toast({
          title: "Success",
          description: response.data.msg,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        closeModal();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorLog
      ) {
        setLoading(false);
        setError(error.response.data.errorLog);
      }
    }
  };

  if (!deadlines || !user) {
    return (
      <Center pt={4}>
        <Spinner emptyColor="gray.200" color="teal" size="md" />
      </Center>
    );
  }

  return (
    <>
      {selectedDeadline ? (
        <CustomModal
          isOpen={isOpen}
          triggerAction={triggerAction}
          setTriggerAction={setTriggerAction}
          modalHeader={`Update ${selectedDeadline.deadline_name} Deadline`}
        >
          <Box p={3}>
            <form onSubmit={handleUpdatingDeadline}>
              <HStack mb={3}>
                <Input
                  placeholder="Deadline Date"
                  type="datetime-local"
                  onChange={(e) => setDate(e.target.value)}
                />
                <Input
                  placeholder="Deadline Value"
                  type="number"
                  value={deadline_value}
                  onChange={(e) => setValue(Number(e.target.value))}
                />
              </HStack>

              <Input
                placeholder="Deadline Name"
                type="text"
                value={deadline_name}
                onChange={(e) => setName(e.target.value)}
              />

              {error ? (
                typeof error === "string" ? (
                  <Box color="red.500" mt={3}>
                    {error}
                  </Box>
                ) : error.length > 0 ? (
                  <Box color="red.500" mt={3} textAlign="center">
                    {error.map((err) => {
                      return <p key={err}>{err}</p>;
                    })}
                  </Box>
                ) : (
                  <>
                    <Box color="red.500" mt={3} textAlign="center">
                      {error}
                    </Box>
                  </>
                )
              ) : null}

              <HStack
                mt={5}
                justifyContent="end"
                alignItems="center"
                w="100%"
                p={3}
              >
                <Button
                  type="submit"
                  isLoading={isLoading}
                  loadingText={"Adding Deadline..."}
                  colorScheme="teal"
                >
                  Update Deadline
                </Button>
                <Button
                  me={3}
                  onClick={closeModal}
                  isDisabled={isLoading ? true : false}
                  colorScheme="teal"
                >
                  Cancel
                </Button>
              </HStack>
            </form>
          </Box>
        </CustomModal>
      ) : null}
      <Box>
        {deadlines.length > 0 ? (
          <VStack spacing={4} align="center" justify="center" p={4}>
            {deadlines.map((deadline) => {
              const date = new Date(deadline.created_at);
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                timeZone: "UTC",
              });

              return (
                <Card
                  key={deadline._id}
                  w={"100%"}
                  size={"lg"}
                  boxShadow="lg"
                  _hover={{ boxShadow: "xl" }}
                  cursor="pointer"
                >
                  <CardBody>
                    <HStack>
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w={"100%"}
                        onClick={() => {
                          setDeadline(deadline);
                          setName(deadline.deadline_name);
                          setDate(deadline.deadline_date);
                          setValue(deadline.deadline_value);
                          openModal();
                        }}
                      >
                        <Text fontWeight={"bold"} fontSize="lg">
                          {deadline.deadline_name}
                        </Text>
                        <Text fontWeight="bold">{formattedDate}</Text>

                        <Box>
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            as={"span"}
                            pe={3}
                          >
                            {`${deadline.deadline_value} 
                    ${user.currency}`}
                          </Text>
                        </Box>
                      </Flex>
                      <DeleteIcon
                        zIndex={1000}
                        color="red.500"
                        cursor="pointer"
                        onClick={() => {
                          handleDeadLinesDelete(deadline._id);
                        }}
                      />
                    </HStack>
                  </CardBody>
                </Card>
              );
            })}
          </VStack>
        ) : (
          <Center>
            <Text fontSize="lg" fontWeight="bold" as={"span"} p={5}>
              No Deadlines found.
            </Text>
          </Center>
        )}
      </Box>
    </>
  );
};

export default DeadlineList;
