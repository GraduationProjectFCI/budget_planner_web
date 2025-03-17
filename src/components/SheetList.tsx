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
  Input,
  Button,
  Select,
  HStack,
} from "@chakra-ui/react";

import http from "../connection/connect";

import ExpensesList from "../components/ExpensesList";

import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from "@chakra-ui/icons";
import CustomModal from "../modals/customModal";

interface Sheet {
  _id: string;
  sheet_type: string;
  created_at: string;
  value: number;
}

interface User {
  currency: string;
}

interface Label {
  _id: string;
  label: string;
}

interface SheetListProps {
  triggerAction: boolean;
  setTriggerAction: (value: boolean) => void;
  user: User;
  labels: Label[];
}

const SheetList: React.FC<SheetListProps> = ({
  triggerAction,
  setTriggerAction,
  user,
  labels,
}) => {
  const toast = useToast();
  const [sheets, setSheets] = useState<Sheet[] | null>(null);

  const [selectedSheet, setSheet] = useState<Sheet | null>(null);

  const [error, setError] = useState<string | string[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  //form states
  const [label, setLabel] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // modal handlers
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setError(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const getUserSheets = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const response = await http.get("/app/sheets", {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });

        if (response.status === 200) {
          setSheets(response.data.data);
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

    if (!triggerAction) getUserSheets();

    if (triggerAction !== false) setTriggerAction(false);
  }, [triggerAction, setTriggerAction, toast]);

  const handleSheetDelete = async (sheet_id: string) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const response = await http.delete(`/app/sheets/${sheet_id}`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });

      if (response.status === 200) {
        setTriggerAction(true);
        toast({
          title: "Success",
          description: "Sheet deleted successfully.",
          status: "error",
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

  const handleAddingExpenses = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const response = await http.post(
        `/app/sheets/${selectedSheet?._id}`,
        {
          label,
          description,
          value,
        },
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setTriggerAction(true);
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

  if (!sheets || !user || !labels) {
    return (
      <Center pt={4}>
        <Spinner emptyColor="gray.200" color="teal" size="md" />
      </Center>
    );
  }

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        triggerAction={triggerAction}
        setTriggerAction={setTriggerAction}
        modalHeader="Add Expenses"
      >
        {labels.length > 0 ? (
          <form onSubmit={handleAddingExpenses} style={{ width: "100%" }}>
            <Box pe={3} ps={3}>
              <HStack spacing={4} pt={4} pb={4}>
                <Select
                  placeholder="Select label"
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                >
                  {labels.map((label) => (
                    <option key={label._id} value={label.label}>
                      {label.label}
                    </option>
                  ))}
                </Select>
                <Input
                  type="number"
                  placeholder="Value"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = parseInt(inputValue); // convert string to integer
                    setValue(numericValue);
                  }}
                />
              </HStack>

              <HStack>
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
                  loadingText="Adding.."
                  type="submit"
                >
                  Add
                </Button>
              </HStack>
            </Box>
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
          </form>
        ) : null}
        <Box p={3}>
          <ExpensesList
            setTriggerAction={setTriggerAction}
            triggerAction={triggerAction}
            user={user}
            labels={labels}
            sheet={selectedSheet}
            closeModal={closeModal}
          />
        </Box>
      </CustomModal>
      <Box>
        {sheets.length > 0 ? (
          <VStack spacing={4} align="center" justify="center" p={4}>
            {sheets.map((sheet) => {
              const date = new Date(sheet.created_at);
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
                  key={sheet._id}
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
                          setSheet(sheet);
                          openModal();
                        }}
                      >
                        <Box>
                          {sheet.sheet_type === "export" ? (
                            <ArrowUpIcon color="green.500" />
                          ) : (
                            <ArrowDownIcon color="red.500" />
                          )}
                          <Text
                            as={"span"}
                            fontSize="lg"
                            fontWeight="bold"
                            ps={3}
                          >
                            {sheet.sheet_type}
                          </Text>
                        </Box>
                        <Text fontWeight="bold">{formattedDate}</Text>

                        <Box>
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            as={"span"}
                            pe={3}
                          >
                            {`${sheet.value} 
                    ${user.currency}`}
                          </Text>
                        </Box>
                      </Flex>
                      <DeleteIcon
                        zIndex={1000}
                        color="red.500"
                        cursor="pointer"
                        onClick={() => {
                          handleSheetDelete(sheet._id);
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
              No sheets found.
            </Text>
          </Center>
        )}
      </Box>
    </>
  );
};

export default SheetList;
