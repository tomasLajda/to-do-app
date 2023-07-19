import { Check, Delete, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { Task } from '../model';

interface Props {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SingleTask: React.FC<Props> = ({ task, tasks, setTasks }: Props) => {
  const [editing, setEditing] = useState<boolean>(false);

  const [editedTask, setEditedTask] = useState<string>(task.task);

  const doneHandler = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const deleteHandler = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <form>
      {task.isDone ? <s>{task.task}</s> : <span>{task.task}</span>}
      <div>
        <span>
          <Edit2 />
        </span>
        <span onClick={() => deleteHandler(task.id)}>
          <Delete />
        </span>
        <span onClick={() => doneHandler(task.id)}>
          <Check />9
        </span>
      </div>
    </form>
  );
};
export default SingleTask;
