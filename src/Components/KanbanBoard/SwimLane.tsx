import { Text } from "welcome-ui/Text";
import type { TaskType } from "../../Hooks/getKanbanTasks";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/react";
import { StickyNote } from "welcome-ui/StickyNote";

export const SwimLane = ({
  tasks,
  title,
  id,
}: {
  tasks: TaskType[];
  title: string;
  id: string;
}) => {
  // Set up the droppable area for the swim lane using useDroppable from @dnd-kit/react
  const { isDropTarget, ref } = useDroppable({ id: id });

  return (
    <div
      ref={ref}
      className={`${isDropTarget ? "is-dragging" : "droppable"} swimlane p-xl rounded-md bg-grid-warm-minimal`}
      id="todo-lane"
    >
      <Text variant="heading-md-strong">{title}</Text>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {!tasks.length && (
        <div  className=" no-tasks --spacing-16" >No tasks in this lane</div>
      )}
    </div>
  );
};

export default SwimLane;
