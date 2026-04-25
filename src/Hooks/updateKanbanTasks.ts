import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { Task } from "../types/task";
import { TASKS_API_URL } from "../Services/api";

type UpdateTaskInput = {
  id: string;
  taskStatus: Task["taskStatus"];
};

export const useUpdateTaskStatus = (): UseMutationResult<
  Task,
  Error,
  UpdateTaskInput
> => {
  const queryClient = useQueryClient();

  
  return useMutation<Task, Error, UpdateTaskInput>({
    mutationFn: async ({ id, taskStatus }) => {
      const response = await fetch(`${TASKS_API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskStatus }),
      });
      if (!response.ok) throw new Error("Failed to update task status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
