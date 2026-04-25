import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskType } from "./getKanbanTasks";

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      taskStatus,
    }: {
      id: string;
      taskStatus: string;
    }) => {
      const response = await fetch(
        `https://69eccd72af4ff533142b65c2.mockapi.io/kanban/KanbanTasks/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskStatus }),
        },
      );
      if (!response.ok) throw new Error("Failed to update task status");
      return response.json();
    },
    onMutate: async ({ id, taskStatus: newStatus }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<TaskType[]>(["tasks"]);
      queryClient.setQueryData<TaskType[]>(["tasks"], (old) =>
        old?.map((task) =>
          task.id === id ? { ...task, taskStatus: newStatus } : task,
        ),
      );
      return { previousTasks };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
