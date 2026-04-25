import type { ReactNode } from "react";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { useUpdateTaskStatus } from "../../Hooks/updateKanbanTasks";
import "./KanbanBoard.css";
import Error from "../Feedback/Error/Error";
import Loading from "../Feedback/Loading/Loading";
import type { TASK_STATUS } from "../../types/task";

export const KanbanBoard = ({
  children,
  isLoading,
  isError,
}: {
  children: ReactNode;
  isLoading: boolean;
  isError: boolean;
}) => {
  const { mutate } = useUpdateTaskStatus();

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation } = event;
    const source = operation.source;
    const target = operation.target;

    console.log("TARGET>>", target.id);
    if (!target) return;
    mutate({
      id: source.id as string,
      taskStatus: target.id as TASK_STATUS,
    });
  };

  if (isError) {
    return <Error />;
  }
  return (
    <div className="dragg-and-drop-container">
      <DragDropProvider onDragEnd={handleDragEnd}>
        {isLoading ? <Loading /> : children}
      </DragDropProvider>
      {/* // Set up the DragDropProvider to handle drag-and-drop interactions for the swim lanes and task cards */}
    </div>
  );
};

export default KanbanBoard;
