import { useState, useEffect, memo } from "react";
import {
  CircularProgress,
  CircularProgressLabel,
  Box,
  Text,
} from "@chakra-ui/react";

const SemiCircularProgressBar = memo(({ percentage, duration, details }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress >= percentage) {
        clearInterval(interval);
      }
    }, duration / percentage);

    return () => {
      clearInterval(interval);
    };
  }, [percentage, duration]);

  return (
    <Box
      width="30rem"
      height="30rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      m={8}
    >
      <CircularProgress
        value={progress}
        size="30rem"
        thickness={4}
        color="teal.500"
        capIsRound
        startPosition="right"
        endPosition="left"
      >
        <CircularProgressLabel
          fontSize="6xl"
          fontWeight="bold"
          value={progress}
          valueLabelDisplay="auto"
          valueLabelStyle={{ fontSize: "5rem" }}
        >
          {progress}%
          <Box textAlign="center">
            <Text fontSize="md" fontWeight="bold" color="gray.600">
              {details}
            </Text>
          </Box>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
});

export default SemiCircularProgressBar;
