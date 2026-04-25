import { useQuery } from "@tanstack/react-query";
import { TASK_STATUS, type Task } from "../types/task";
import { TASKS_API_URL } from "../Services/api";

export const TaskStatusLabels = {
  "To Do": TASK_STATUS.TO_DO,
  "In Progress": TASK_STATUS.IN_PROGRESS,
  Done: TASK_STATUS.DONE,
} as const;

const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(
    `${TASKS_API_URL}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
};

export const useKanbanTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};
