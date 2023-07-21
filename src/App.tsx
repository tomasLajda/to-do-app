import { CalendarCheck2 } from 'lucide-react';
import { useState } from 'react';
import './App.css';
import InputField from './components/input-field.component';
import TaskList from './components/task-list.component';
import { Task } from './model';

const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!task) return;

    setTasks([...tasks, { id: Date.now(), task, isDone: false }]);
    setTask('');
  };

  return (
    <div className="bg-red-500 h-screen w-screen flex justify-center">
      <div className="flex flex-col max-w-screen-md w-full space-y-8 mt-10 p-2">
        <div className="flex justify-center space-x-4 text-slate-50 ">
          <h1 className="text-5xl sm:text-6xl">Your Task List</h1>
          <CalendarCheck2 size={60} />
        </div>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default App;
