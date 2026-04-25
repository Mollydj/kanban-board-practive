import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { Task } from "../types/task";
import { TASKS_API_URL } from "../Services/api";

export const useUpdateTaskStatus = (): UseMutationResult<
  Task,
  Error,
  { id: string; taskStatus: string }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, taskStatus }: Omit<Task, "taskName">) => {
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
