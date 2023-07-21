import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Task } from './model';

import { CalendarCheck2 } from 'lucide-react';
import InputField from './components/input-field.component';
import TaskList from './components/task-list.component';

import './App.css';

const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!task) return;

    setTasks([...tasks, { id: Date.now(), task, isDone: false }]);
    setTask('');
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const active = tasks;
    const completed = completedTasks;
    const dropTask =
      source.droppableId === 'active-tasks'
        ? active[source.index]
        : completed[source.index];

    dropTask.isDone = !dropTask.isDone;

    if (destination.droppableId === 'completed-tasks') {
      // Move task to the completed tasks list
      completed.splice(destination.index, 0, dropTask);
      active.splice(source.index, 1);
    } else {
      // Move task to the active tasks list
      active.splice(destination.index, 0, dropTask);
      completed.splice(source.index, 1);
    }

    setCompletedTasks(completed);
    setTasks(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-red-500 h-screen w-screen flex justify-center">
        <div className="flex flex-col max-w-screen-md w-full space-y-8 mt-10 p-2">
          <div className="flex justify-center space-x-4 text-slate-50 ">
            <h1 className="text-5xl sm:text-6xl">Your Task List</h1>
            <CalendarCheck2 size={60} />
          </div>
          <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
