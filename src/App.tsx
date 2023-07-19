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
    <div>
      <h1>ToDo: Your Task List</h1>
      <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
