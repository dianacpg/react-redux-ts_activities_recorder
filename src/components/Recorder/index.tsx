// React
import { useEffect, useState, ReactElement, useMemo } from "react";
// Style
import styles from "./styles/recorder.module.scss";
// Utils
import { formatSeconds } from "../../lib/utils/format-seconds";

interface RecorderProps {
  /** function to call when stop recorder */
  onStop: (dateStart: string | undefined) => void;
}

/**
 * Component that provides recording functionality with a timer.
 */

const Recorder = ({ onStop }: RecorderProps): ReactElement => {
  // Event Start Date
  const [dateStart, setDateStart] = useState<string | undefined>(undefined);
  // Recorder time
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
        console.log(currentTime, startTime);
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        console.log(elapsedSeconds);
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
    <div className={`${styles.recorder} ${dateStart ? styles["recorder--started"] : ""}`}>
      <button onClick={handleToggleRecording} className={styles["recorder-button"]}>
        <span></span>
      </button>
      <div className={styles["recorder-counter"]}>{counterText}</div>
    </div>
  );
};

export default Recorder;
