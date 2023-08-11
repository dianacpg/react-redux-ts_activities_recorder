import { useRef, useEffect, useState, ReactElement, useMemo } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles/recorder.module.scss";
import { addZero } from "../../lib/utils/add-zero";
import { startRecorder, stopRecorder } from "../../store/modules/recorder";
import { createUserEvent } from "../../store/modules/user-events";
import { useAppSelector } from "../../store/hooks";

const Recorder = (): ReactElement => {
  const dispatch = useDispatch();
  const { dateStart } = useAppSelector((state) => state.recorder);
  const isStarted = dateStart !== "";
  const seconds = isStarted ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000) : 0;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60);
  const counterText = useMemo(() => {
    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
  }, [hours, minutes, seconds]);
  const interval = useRef<number>(0);
  const [, setCount] = useState<number>(0);

  const handleStartRecording = () => {
    dispatch(startRecorder());
    interval.current = window.setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    window.clearInterval(interval.current);
    dispatch(createUserEvent());
    dispatch(stopRecorder());
  };

  const handleClick = () => {
    if (isStarted) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  //to make sure that we use the previous count on useRef
  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  return (
    <div className={`${styles.recorder} ${isStarted ? styles["recorder--started"] : ""}`}>
      <button onClick={handleClick} className={styles["recorder-button"]}>
        <span></span>
      </button>
      <div className={styles["recorder-counter"]}>{counterText}</div>
    </div>
  );
};

export default Recorder;
