// React
import { useEffect, useState, ReactElement, useMemo } from "react";
// Style
import styles from "./styles/stopwatch.module.scss";
// Utils
import { formatSeconds } from "../../lib/utils/format-seconds";

interface StopwatchProps {
  /** function to call when stop Stopwatch */
  onStop: (dateStart: string | undefined) => void;
}

/**
 * Component that provides recording functionality with a timer.
 */

const Stopwatch = ({ onStop }: StopwatchProps): ReactElement => {
  // Event Start Date
  const [dateStart, setDateStart] = useState<string | undefined>(undefined);
  // Stopwatch time
  const [seconds, setSeconds] = useState(0);
  // Counter in hh:mm:ss style
  const counterText = useMemo(() => formatSeconds(seconds), [seconds]);

  /**
   * Toggles the recording state.
   */
  const handleToggleRecording = () => {
    if (dateStart) {
      onStop(dateStart);
      setDateStart(undefined);
    } else {
      setDateStart(new Date().toISOString());
    }
  };

  /**
   *  Update the recording time and manage the interval.
   */
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;

    if (dateStart) {
      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const startTime = new Date(dateStart).getTime();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        setSeconds(elapsedSeconds);
      }, 1000);
    } else {
      clearInterval(intervalId);
      setSeconds(0); // Reset seconds when not recording
    }

    return () => {
      if (!intervalId) return;
      clearInterval(intervalId);
    };
  }, [dateStart]);

  return (
    <div className={`${styles.stopwatch} ${dateStart ? styles["stopwatch--started"] : ""}`}>
      <button onClick={handleToggleRecording} className={styles["stopwatch-button"]}>
        <span></span>
      </button>
      <div className={styles["stopwatch-counter"]}>{counterText}</div>
    </div>
  );
};

export default Stopwatch;
