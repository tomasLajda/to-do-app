import { ArrowBigLeft, ArrowBigRight, Edit2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../model';
import { Input } from './ui/input';

interface Props {
  index: number;
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  otherTasks: Task[];
  setOtherTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SingleTask: React.FC<Props> = ({
  task,
  tasks,
  setTasks,
  index,
  otherTasks,
  setOtherTasks,
}: Props) => {
  const [editing, setEditing] = useState<boolean>(false);

  const [editingTask, setEditingTask] = useState<string>(task.task);

  const doneHandler = (id: number) => {
    const doneTask = tasks.find((task) => task.id === id);
    if (!doneTask) return;

    doneTask.isDone = !doneTask.isDone;
    setOtherTasks([...otherTasks, doneTask]);

    deleteHandler(id);
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
    editing ? inputRef.current?.focus() : inputRef.current?.blur();
  }, [editing]);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <form
          className="bg-slate-100 h-12 p-2 rounded-md flex justify-between items-center "
          onSubmit={(event) => editInputHandler(event, task.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
          <div className="flex items-center space-x-1">
            <span className="cursor-pointer" onClick={editingHandler}>
              <Edit2 size={24} />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => deleteHandler(task.id)}
            >
              <X size={26} />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => doneHandler(task.id)}
            >
              {task.isDone ? (
                <ArrowBigLeft size={26} />
              ) : (
                <ArrowBigRight size={26} />
              )}
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};
export default SingleTask;
