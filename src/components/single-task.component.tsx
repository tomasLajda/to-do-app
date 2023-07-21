import { Check, Delete, Edit2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Task } from '../model';
import { Input } from './ui/input';

interface Props {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SingleTask: React.FC<Props> = ({ task, tasks, setTasks }: Props) => {
  const [editing, setEditing] = useState<boolean>(false);

  const [editingTask, setEditingTask] = useState<string>(task.task);

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

  const editingHandler = () => {
    if (!editing && !task.isDone) setEditing(!editing);
  };

  const editingTaskHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTask(event.target.value);
  };

  const editInputHandler = (
    event: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    event.preventDefault();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, task: editingTask } : task
      )
    );
    setEditing(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editing]);

  return (
    <form
      className="bg-slate-100 h-12 p-2 rounded-md flex justify-between items-center "
      onSubmit={(event) => editInputHandler(event, task.id)}
    >
      <div className="max-w-xs">
        {editing ? (
          <Input
            className="border-slate-950 border-2 h-8"
            ref={inputRef}
            value={editingTask}
            onChange={editingTaskHandler}
            placeholder="Enter your task"
          />
        ) : task.isDone ? (
          <s>{task.task}</s>
        ) : (
          <span>{task.task}</span>
        )}
      </div>
      <div className="flex space-x-1">
        <span onClick={editingHandler}>
          <Edit2 />
        </span>
        <span onClick={() => deleteHandler(task.id)}>
          <Delete />
        </span>
        <span onClick={() => doneHandler(task.id)}>
          <Check />
        </span>
      </div>
    </form>
  );
};
export default SingleTask;
