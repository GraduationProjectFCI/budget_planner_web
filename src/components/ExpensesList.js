import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  HStack,
  VStack,
  Text,
  Center,
  Spinner,
  Button,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";

import http from "../connection/connect";

import { DeleteIcon } from "@chakra-ui/icons";

const ExpensesList = ({
  triggerAction,
  setTriggerAction,
  user,
  labels,
  sheet,
  closeModal,
}) => {
  const toast = useToast();
  const [error, setError] = useState();
  const [label, setLabel] = useState("");
  const [isLoading, setLoading] = useState();
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const [expenses, setExpenses] = useState();

  useEffect(() => {
    const getExpenses = async (sheet) => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const response = await http.get(`/app/sheets/${sheet._id}`, {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });

        if (response.status === 200) {
          setLoading(false);
          setExpenses(response.data.data);
        }
      } catch (error) {
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
      }
    };

    if (sheet && !triggerAction) {
      getExpenses(sheet);
    }

    if (triggerAction !== false) setTriggerAction(false);
  }, [sheet, triggerAction, setTriggerAction, toast]);

  const handleExpensesDelete = async (expenseId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const response = await http.delete(
        `/app/sheets/${sheet._id}/${expenseId}`,
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );

      if (response.status === 200) {
        setTriggerAction(true);
        toast({
          title: "Success",
          description: response.data.msg,
          status: "success",
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
        setError(error.response.data.errorLog);
      }
    }
  };

  const handleExpensesUpdate = async (e, expense_id) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const response = await http.patch(
        `/app/sheets/${sheet._id}/${expense_id}`,
        {
          label,
          value,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
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

  return (
    <Box>
      {expenses ? (
        <Box>
          {expenses.length > 0 ? (
            <Accordion allowToggle>
              <Box>
                {expenses.map((expense) => {
                  const date = new Date(expense.created_at);
                  const formattedDate = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    timeZone: "UTC",
                  });

                  return (
                    <AccordionItem key={expense._id}>
                      <HStack spacing={4} align="center">
                        <Box w="100%">
                          <AccordionButton>
                            <VStack spacing={4} w="100%">
                              <HStack justifyContent="space-between" w="100%">
                                <Box flex="1" textAlign="left">
                                  {expense.label}
                                </Box>

                                <Box flex="1" textAlign="right">
                                  {expense.value} {user.currency}
                                </Box>
                              </HStack>
                              <HStack justifyContent="space-between" w="100%">
                                <Text>{expense.description}</Text>
                                <Text>{formattedDate}</Text>
                              </HStack>
                            </VStack>
                          </AccordionButton>
                          <AccordionPanel>
                            <form
                              onSubmit={(e) => {
                                handleExpensesUpdate(e, expense._id);
                              }}
                            >
                              <HStack spacing={4} pt={4} pb={4}>
                                <Select
                                  placeholder="Select Label"
                                  onChange={(e) => {
                                    setLabel(e.target.value);
                                  }}
                                >
                                  {labels?.map((label) => (
                                    <option key={label._id} value={label.label}>
                                      {label.label}
                                    </option>
                                  ))}
                                </Select>
                                <Input
                                  type="number"
                                  placeholder="Value"
                                  onChange={(e) => {
                                    setValue(e.target.value);
                                  }}
                                />
                              </HStack>
                              <HStack spacing={4}>
                                <Input
                                  type="text"
                                  placeholder="Description"
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                />
                                <Button
                                  colorScheme="teal"
                                  isLoading={isLoading}
                                  loadingText="Updating.."
                                  type="submit"
                                >
                                  Update
                                </Button>
                              </HStack>

                              {error ? (
                                typeof err === "string" ? (
                                  <Box color="red.500" mt={3}>
                                    {error}
                                  </Box>
                                ) : error.length > 0 ? (
                                  <Box
                                    color="red.500"
                                    mt={3}
                                    textAlign="center"
                                  >
                                    {error.map((error) => {
                                      return <p key={error}>{error}</p>;
                                    })}
                                  </Box>
                                ) : (
                                  <>
                                    <Box
                                      color="red.500"
                                      mt={3}
                                      textAlign="center"
                                    >
                                      {error}
                                    </Box>
                                  </>
                                )
                              ) : null}
                            </form>
                          </AccordionPanel>
                        </Box>

                        <DeleteIcon
                          m={3}
                          color="red.500"
                          cursor="pointer"
                          onClick={() => {
                            handleExpensesDelete(expense._id);
                          }}
                        />
                      </HStack>
                    </AccordionItem>
                  );
                })}
              </Box>
            </Accordion>
          ) : (
            <Center>
              <Text>No expenses found.</Text>
            </Center>
          )}
        </Box>
      ) : (
        <Center>
          <Spinner color="teal.500" size="md" p={3} />
        </Center>
      )}
    </Box>
  );
};

export default ExpensesList;
