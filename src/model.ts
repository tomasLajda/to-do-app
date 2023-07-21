export interface Task {
  id: number;
  task: string;
  isDone: boolean;
}

export type TaskActions =
  | { type: 'add'; payload: string }
  | { type: 'remove'; payload: string }
  | { type: 'done'; payload: string };
