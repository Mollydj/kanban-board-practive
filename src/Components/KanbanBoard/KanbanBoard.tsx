import type { ReactNode } from "react";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { useUpdateTaskStatus } from "../../Hooks/updateKanbanTasks";
import "./KanbanBoard.css";
import type { TASK_STATUS } from "../../types/task";

export const KanbanBoard = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { mutate } = useUpdateTaskStatus();

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation } = event;
    const source = operation?.source;
    const target = operation.target;
    const newStatus = target?.id as string

    if (!target) return null;
    mutate({
      id: source.id as string,
      taskStatus: newStatus as TASK_STATUS,
    });
  };


  return (
    <div className="drag-and-drop-container">
      <DragDropProvider onDragEnd={handleDragEnd}>
        {children}
      </DragDropProvider>
      {/* Set up the DragDropProvider to handle drag-and-drop interactions for the swim lanes and task cards */}
    </div>
  );
};

export default KanbanBoard;
