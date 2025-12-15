import styles from './taskFilterBtn.module.css';
import { Link } from "react-router-dom";
const TaskFilterBtn = ({text, to, taskNum}) => {
  return (
    <Link 
      className={styles.taskFilterBtn} 
      to={to}>
      <p>{taskNum}</p>
      <p>{text}</p>
    </Link>
  );
};

export default TaskFilterBtn; 