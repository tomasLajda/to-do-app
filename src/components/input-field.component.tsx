import { useRef } from 'react';

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
    <form action="" onSubmit={handleAddHandler}>
      <input
        ref={inputRef}
        type="input"
        value={task}
        onChange={setTaskHandler}
        placeholder="Enter your task"
      />
      <button type="submit">Submit Task</button>
    </form>
  );
};
export default InputField;
