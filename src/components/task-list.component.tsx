import { Task } from '../model';
import SingleTask from './single-task.component';

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<Props> = ({ tasks, setTasks }: Props) => {
  return (
    <div className="flex flex-col justify-between space-y-4 sm:space-x-4 sm:flex-row sm:space-y-0">
      <div className="w-full  bg-emerald-500 border-2 border-slate-950 rounded-md px-2 py-4">
        <h1 className="text-slate-50 text-2xl mb-2">Active Tasks</h1>
        <div className="flex flex-col space-y-4">
          {tasks.map((task) => (
            <SingleTask
              task={task}
              key={task.id}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
        </div>
      </div>
      <div className="w-full bg-blue-400 border-2 border-slate-950 rounded-md px-2 py-4">
        <h1 className="text-slate-50 text-2xl mb-2">Finished Tasks</h1>
        <div className="flex flex-col space-y-4 ">
          {tasks.map((task) => (
            <SingleTask
              task={task}
              key={task.id}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TaskList;
