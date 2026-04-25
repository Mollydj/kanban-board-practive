import type { TaskType } from "../../Hooks/getKanbanTasks";
import { useDraggable } from "@dnd-kit/react";

export const TaskCard = ({ task }: { task: TaskType }) => {
  const { ref } = useDraggable({
    id: task.id,
  });
  return (
    <div ref={ref} className="task" key={task.id}>
      {task.taskName}
    </div>
  );
};

export default TaskCard;
