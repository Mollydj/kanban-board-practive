import { Text } from "welcome-ui/Text";
import type { TaskType } from "../../Hooks/getKanbanTasks";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/react";

export const SwimLane = ({
  tasks,
  title,
  id
}: {
  tasks: TaskType[];
  title: string;
  id: string
}) => {
  // console.log("Tasks in swimlane>>", title);
  const { isDropTarget, ref } = useDroppable({ id: id });

  return (
    <div
      ref={ref}
      className={`${isDropTarget ? "is-dragging" : "droppable"} swimlane p-xl rounded-md bg-grid-warm-minimal`}
      id="todo-lane"
    >
      <Text variant="heading-md-strong">{title}</Text>
      {tasks.map((task) => (
        <TaskCard task={task} />
      ))}
    </div>
  );
};

export default SwimLane;
