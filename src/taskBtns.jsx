

const TaskBtns = ({onAddTask, onDoneTask}) => {
  return (
    <>
    <button className="add-task-btn" onClick={onAddTask}>
        Add Task
    </button>
    <button className="add-task-btn" onClick={onDoneTask}>
        Done
    </button>
    </>
    );
};

export default TaskBtns;