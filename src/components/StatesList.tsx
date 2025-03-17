import { useState, useEffect } from "react";
import http from "../connection/connect";
import {
  useToast,
  Box,
  HStack,
  Text,
  Center,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";

import Loader from "../components/Loader";
import ProgressbarComponent from "../components/Progressbar";

interface State {
  _id: string;
  label: string;
  labelPercentageSpent: number;
  labelPercentageTotal: number;
  expensesSum: number;
}

interface StatesResponse {
  statistics: State[];
}

interface StatesListProps {
  triggerAction: boolean;
  setTriggerAction: (value: boolean) => void;
}

const StatesList: React.FC<StatesListProps> = ({ triggerAction, setTriggerAction }) => {
  const toast = useToast();
  const [states, setStates] = useState<StatesResponse | null>(null);

  useEffect(() => {
    const getStates = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData") || '{}');
        const response = await http.get("/app/statistics", {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });

        if (response.status === 200) {
          setStates(response.data.data);
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

    if (!triggerAction) {
      getStates();
    }

    if (triggerAction !== false) setTriggerAction(false);
  }, [setTriggerAction, toast, triggerAction]);

  if (!states) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }

  const colors = [
    "yellow.400",
    "teal",
    "teal.300",
    "teal.500",
    "teal.700",
    "red.300",
    "red.400",
    "blue.400",
    "green",
    "green.400",
    "green.500",
    "orange",
    "orange.400",
    "pink",
    "purple.300",
    "purple.500",
    "cyan.400",
    "cyan.500",
  ];

  return (
    <Card mt={4} boxShadow="lg" rounded="lg" p={4} bg={"rgb(0,0,0,0.09)"}>
      <Text fontWeight="bold" fontSize={"2xl"} p={4}>
        Statistics
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={4}>
        {states.statistics.map((state) => {
          const randomIndex = Math.floor(Math.random() * colors.length);
          const randomIndex2 = Math.floor(Math.random() * colors.length);
          //select random color for each state
          const randomColor = colors[randomIndex];
          const randomColor2 = colors[randomIndex2];
          return (
            <Card
              p={4}
              boxShadow="lg"
              // bg="#f9f9f9"
              rounded="lg"
              overflow="hidden"
              key={state._id}
            >
              <Center>
                <Text fontWeight="bold" fontSize={"2xl"}>
                  {state.label}
                </Text>
              </Center>
              <Box>
                <HStack align="center" justify="center">
                  <ProgressbarComponent
                    percentage={state.labelPercentageSpent}
                    duration={1000}
                    progressColor={randomColor}
                    progressBarSize="14rem"
                    fontWeight="bold"
                    fontSize="5xl"
                    // TrailColor="#dddddd"
                    details={
                      <Box
                        textAlign="center"
                        fontSize="md"
                        fontWeight="6xl"
                        // color="#666"
                      >
                        <Text fontWeight="bold" fontSize={"sm"}>
                          {`${state.expensesSum}${" "} Spent Budget`}
                        </Text>
                      </Box>
                    }
                  />
                  <ProgressbarComponent
                    percentage={state.labelPercentageTotal}
                    duration={1500}
                    progressColor={randomColor2}
                    progressBarSize="14rem"
                    fontWeight="bold"
                    fontSize="5xl"
                    // TrailColor="#dddddd"
                    details={
                      <Box
                        textAlign="center"
                        fontSize="md"
                        fontWeight="6xl"
                        // color="#666"
                      >
                        <Text fontWeight="bold" fontSize={"sm"}>
                          {`${state.expensesSum}${" "} Total Budget`}
                        </Text>
                      </Box>
                    }
                  />
                </HStack>
              </Box>
            </Card>
          );
        })}
      </SimpleGrid>
    </Card>
  );
};

export default StatesList;
