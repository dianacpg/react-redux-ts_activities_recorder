// Styles
import styles from "./styles/empty-state.module.scss";

const EmptyState = () => {
  return (
    <div className={styles["empty-state"]}>
      <h2>There is no activities recorded yet.</h2>
      <p> Start recording you first activity by clicking on the stopwatch. </p>
    </div>
  );
};

export default EmptyState;
