import { Droppable } from 'react-beautiful-dnd';
import { Task } from '../model';
import SingleTask from './single-task.component';

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTasks: Task[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<Props> = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}: Props) => {
  return (
    <div className="flex flex-col justify-between space-y-4 sm:space-x-4 sm:flex-row sm:space-y-0">
      <Droppable droppableId="active-tasks">
        {(provided) => (
          <div
            className="w-full bg-emerald-500 border-2 border-slate-950 rounded-md px-2 py-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h1 className="text-slate-50 text-2xl mb-2">Active Tasks</h1>
            <div className="flex flex-col space-y-4">
              {tasks.map((task, index) => (
                <SingleTask
                  index={index}
                  task={task}
                  key={task.id}
                  tasks={tasks}
                  setTasks={setTasks}
                  otherTasks={completedTasks}
                  setOtherTasks={setCompletedTasks}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="completed-tasks">
        {(provided) => (
          <div
            className="w-full bg-blue-400 border-2 border-slate-950 rounded-md px-2 py-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h1 className="text-slate-50 text-2xl mb-2">Finished Tasks</h1>
            <div className="flex flex-col space-y-4 ">
              {completedTasks.map((task, index) => (
                <SingleTask
                  index={index}
                  task={task}
                  key={task.id}
                  tasks={completedTasks}
                  setTasks={setCompletedTasks}
                  otherTasks={tasks}
                  setOtherTasks={setTasks}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default TaskList;
