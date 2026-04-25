import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskType } from "./getKanbanTasks";

export const useCreateKanbanTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Omit<TaskType, "id">) => {
      const response = await fetch(
        `https://69eccd72af4ff533142b65c2.mockapi.io/kanban/KanbanTasks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taskName: task.taskName,
            taskStatus: task.taskStatus,
          }),
        },
      );
      if (!response.ok) throw new Error("Failed to create task");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
