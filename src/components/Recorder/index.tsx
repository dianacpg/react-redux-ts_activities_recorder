import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import "./Recorder.scss";
import { addZero } from "../../lib/utils/add-zero";
import { startRecorder, stopRecorder } from "../../store/modules/recorder";
import { createUserEvent } from "../../store/modules/user-events";
import { useAppSelector } from "../../store/hooks";

const Recorder = () => {
  const dispatch = useDispatch();
  const dateStart = useAppSelector((state) => state.recorder.dateStart);
  const started = dateStart !== "";
  const interval = useRef<number>(0);
  const [, setCount] = useState<number>(0);

  const handleClick = () => {
    if (started) {
      window.clearInterval(interval.current);
      dispatch(createUserEvent());
      dispatch(stopRecorder());
    } else {
      dispatch(startRecorder());
      interval.current = window.setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }
  };

  //to make sure that we use the previous count on useRef
  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  let seconds = started ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000) : 0;
  const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
  seconds -= hours * 60 * 60;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds -= minutes * 60;

  return (
    <div className={cx("recorder", { "recorder-started": started })}>
      <button onClick={handleClick} className="recorder-record">
        <span></span>
      </button>
      <div className="recorder-counter">
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  );
};

export default Recorder;
