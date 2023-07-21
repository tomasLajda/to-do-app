import { useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (event: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ task, setTask, handleAdd }: Props) => {
  const setTaskHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTask(event.target.value);

  const handleAddHandler = (event: React.FormEvent) => {
    handleAdd(event);
    inputRef.current?.blur();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      action=""
      onSubmit={handleAddHandler}
      className="flex items-center w-full"
    >
      <Input
        className="bg-slate-100 rounded-r-none focus-visible:border-2 focus-visible:border-slate-950"
        ref={inputRef}
        type="input"
        value={task}
        onChange={setTaskHandler}
        placeholder="Enter your task"
      />
      <Button className="rounded-l-none w-32" type="submit">
        Submit Task
      </Button>
    </form>
  );
};
export default InputField;
