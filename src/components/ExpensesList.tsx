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

interface User {
  currency: string;
}

interface Label {
  _id: string;
  label: string;
}

interface Expense {
  _id: string;
  label: string;
  value: number;
  description: string;
  created_at: string;
}

interface Sheet {
  _id: string;
}

interface ExpensesListProps {
  triggerAction: boolean;
  setTriggerAction: (value: boolean) => void;
  user: User;
  labels: Label[];
  sheet: Sheet;
  closeModal: () => void;
}

const ExpensesList: React.FC<ExpensesListProps> = ({
  triggerAction,
  setTriggerAction,
  user,
  labels,
  sheet,
  closeModal,
}) => {
  const toast = useToast();
  const [error, setError] = useState<string | string[] | undefined>();
  const [label, setLabel] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");

  const [expenses, setExpenses] = useState<Expense[] | undefined>();

  useEffect(() => {
    const getExpenses = async (sheet: Sheet) => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const response = await http.get(`/app/sheets/${sheet._id}`, {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });

        if (response.status === 200) {
          setLoading(false);
          setExpenses(response.data.data);
        }
      } catch (error: any) {
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

  const handleExpensesDelete = async (expenseId: string) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
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
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorLog
      ) {
        setError(error.response.data.errorLog);
      }
    }
  };

  const handleExpensesUpdate = async (e: React.FormEvent, expense_id: string) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
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
    } catch (error: any) {
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
                          <AccordionButton
                            onClick={() => {
                              setLabel(expense.label);
                              setValue(expense.value);
                              setDescription(expense.description);
                            }}
                          >
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
                                  value={label}
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
                                  value={value}
                                  onChange={(e) => {
                                    setValue(e.target.value);
                                  }}
                                />
                              </HStack>
                              <HStack spacing={4}>
                                <Input
                                  type="text"
                                  placeholder="Description"
                                  value={description}
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                />
                                <Button
                                  colorScheme="teal"
                                  isLoading={isLoading}
                                  loadingText="Updating.."
                                  type="submit"
                                  ps={5}
                                  pe={5}
                                >
                                  Update
                                </Button>
                              </HStack>

                              {error ? (
                                typeof error === "string" ? (
                                  <Box color="red.500" mt={3}>
                                    {error}
                                  </Box>
                                ) : error.length > 0 ? (
                                  <Box
                                    color="red.500"
                                    mt={3}
                                    textAlign="center"
                                  >
                                    {error.map((err) => {
                                      return <p key={err}>{err}</p>;
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

      <HStack spacing={4} align="center" justify="space-between" pt={4}>
        <Text fontSize="lg" fontWeight="bold" textAlign="start" p={4}>
          {" "}
          Sheet Value :{" "}
          {expenses
            ? expenses.reduce((acc, expense) => {
                return acc + expense.value;
              }, 0)
            : 0}{" "}
        </Text>
        <Button colorScheme="teal" mr={3} onClick={closeModal}>
          Cancel
        </Button>
      </HStack>
    </Box>
  );
};

export default ExpensesList;
