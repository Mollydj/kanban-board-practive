import { useDraggable } from "@dnd-kit/react";
import type { Task } from "../../types/task";

export const TaskCard = ({ task }: { task: Task }) => {
  const { ref } = useDraggable({
    id: task.id,
  });
  if (!task.taskName.trim()) return null;
  return (
    <div ref={ref} aria-label={`Task: ${task.taskName}`} className="task">
      {task.taskName}
    </div>
  );
};

export default TaskCard;
