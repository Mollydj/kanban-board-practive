import type { ReactNode } from "react";
import { Loader } from "welcome-ui/Loader";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { useUpdateTaskStatus } from "../../Hooks/updateKanBanTasks";

export const KanBoardContainer = ({
  children,
  isLoading,
  isError,
}: {
  children: ReactNode;
  isLoading: boolean;
  isError: boolean;
}) => {
  const { mutate: updateTaskStatus } = useUpdateTaskStatus();

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation } = event;
    const source = operation.source;
    const target = operation.target;
    if (!target) return;
    updateTaskStatus({
      id: source.id as string,
      taskStatus: target.id as string,
    });
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <p>Error occurred while fetching tasks.</p>;
  }
  return (
    <div className="lanes">
      <DragDropProvider onDragEnd={handleDragEnd}>{children}</DragDropProvider>
    </div>
  );
};

export default KanBoardContainer;
