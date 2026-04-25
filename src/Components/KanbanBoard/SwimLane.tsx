import { Text } from "welcome-ui/Text";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/react";
import type { Task } from "../../types/task";

type SwimLaneProps = {
  tasks: Task[];
  title: string;
  id: string;
};

export const SwimLane = ({ tasks, title, id }: SwimLaneProps) => {
  // Set up the droppable area for the swim lane using useDroppable from @dnd-kit/react
  const { isDropTarget, ref } = useDroppable({ id: id });

  return (
    <div
      ref={ref}
      className={`${isDropTarget ? "is-dragging" : "droppable"} swimlane p-xl rounded-md bg-grid-warm-minimal`}
    >
      <Text variant="heading-md-strong">{title}</Text>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {!tasks.length && (
        <div className=" no-tasks --spacing-16">No tasks in this lane</div>
      )}
    </div>
  );
};

export default SwimLane;
