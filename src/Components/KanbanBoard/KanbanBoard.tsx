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
    const source = operation.source;
    const target = operation.target;

    if (!target) return null;
    mutate({
      id: source.id as string,
      taskStatus: target.id as TASK_STATUS,
    });
  };


  return (
    <div className="drag-and-drop-container">
      <DragDropProvider onDragEnd={handleDragEnd}>
        {children}
      </DragDropProvider>
    </div>
  );
};

export default KanbanBoard;
