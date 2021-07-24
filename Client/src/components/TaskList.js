import "./TaskList.css";


const TaskList = (props) => {
  return (
    <div className="taskManager">
      {props.userTasks.map((task) => {
        return <div key={task.id} className="taskContainer">{task.title}</div>;
      })}
    </div>
  );
};

export default TaskList;
