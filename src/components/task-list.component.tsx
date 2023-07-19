import { Task } from '../model';
import SingleTask from './single-task.component';

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<Props> = ({ tasks, setTasks }: Props) => {
  return (
    <div>
      {tasks.map((task) => (
        <SingleTask
          task={task}
          key={task.id}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
    </div>
  );
};
export default TaskList;
