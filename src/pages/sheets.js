import { useState } from "react";
import { Button, HStack, useToast, Box } from "@chakra-ui/react";

import http from "../connection/connect";
import SheetList from "../components/SheetList";

const Sheets = ({ triggerAction, setTriggerAction, user, labels }) => {
  const toast = useToast();
  const [isExportLoading, setExportLoading] = useState(false);
  const [isImportLoading, setImportLoading] = useState(false);

  const handleAddingSheet = async (sheetType) => {
    if (sheetType === "export") {
      setExportLoading(true);
    } else {
      setImportLoading(true);
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const response = await http.post(
        "/app/sheets",
        {
          sheet_type: sheetType,
        },
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );

      if (response.status === 200) {
        setExportLoading(false);
        setImportLoading(false);

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
        setExportLoading(false);
        setImportLoading(false);
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

  return (
    <Box>
      <HStack spacing={4} align="center" justify="center" p={4}>
        <Button
          colorScheme="teal"
          isLoading={isExportLoading}
          loadingText={"Add Sheet ..."}
          onClick={() => {
            handleAddingSheet("export");
          }}
        >
          Add Export Sheet
        </Button>
        <Button
          colorScheme="teal"
          isLoading={isImportLoading}
          loadingText={"Add Sheet ..."}
          onClick={() => {
            handleAddingSheet("import");
          }}
        >
          Add Import Sheet
        </Button>
      </HStack>

      <SheetList
        triggerAction={triggerAction}
        setTriggerAction={setTriggerAction}
        user={user}
        labels={labels}
      />
    </Box>
  );
};

export default Sheets;
