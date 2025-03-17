import { useState, useEffect } from "react";
import {
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";

interface CircularProgressBarProps {
  percentage: number;
  duration: number;
  details?: React.ReactNode;
  progressColor: string;
  progressBarSize: string;
  fontWeight: string;
  fontSize: string;
  TrailColor?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  duration,
  details,
  progressColor,
  progressBarSize,
  fontWeight,
  fontSize,
  TrailColor,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;

    if (percentage === 0) {
      setProgress(0);
    } else {
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
    }
  }, [percentage, duration]);

  return (
    <CircularProgress
      value={progress}
      size={progressBarSize}
      thickness={4}
      color={progressColor}
      capIsRound
      trackColor={TrailColor}
    >
      <CircularProgressLabel fontSize={fontSize} fontWeight={fontWeight}>
        <Text>{progress}%</Text>
        {details}
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default CircularProgressBar;
