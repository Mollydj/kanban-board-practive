import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { Task } from "../types/task";
import { TASKS_API_URL } from "../Services/api";

export const useCreateKanbanTask = (): UseMutationResult<
  Task,
  Error,
  Omit<Task, "id">,
  {
    taskName: string;
    taskStatus: string;
  }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Omit<Task, "id">) => {
      const response = await fetch(`${TASKS_API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskName: task.taskName,
          taskStatus: task.taskStatus,
        }),
      });
      if (!response.ok) throw new Error("Failed to create task");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
