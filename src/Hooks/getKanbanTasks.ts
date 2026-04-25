import { useQuery } from "@tanstack/react-query";


export const taskStatus = {
  TO_DO: "TO_DO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
} as const;

export const taskStatusLabels = {
  "To Do": taskStatus.TO_DO,
  "In Progress": taskStatus.IN_PROGRESS,
  Done: taskStatus.DONE,
} as const;

export type TaskType = {
  id: string;
  taskStatus:
    | typeof taskStatus.TO_DO
    | typeof taskStatus.IN_PROGRESS
    | typeof taskStatus.DONE;
  taskName: string;
};

const getTasks = async (): Promise<TaskType[]> => {
  const response = await fetch(
    "https://69eccd72af4ff533142b65c2.mockapi.io/kanban/KanbanTasks",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
};

export const useKanbanTasks = () => {
  return useQuery<TaskType[], Error>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};
