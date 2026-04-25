import Header from "./Components/Header/Header";
import NewTask from "./Components/NewTask/NewTask";
import KanBoardContainer from "./Components/KanbanBoard/KanbanBoardContainer";
import SwimLane from "./Components/KanbanBoard/SwimLane";
import { taskStatus, useKanbanTasks } from "./Hooks/getKanbanTasks";
import { useMemo } from "react";

function App() {
  const { data = [], isLoading, isError } = useKanbanTasks();
  const groupedTasks = useMemo(() => {
    return {
      [taskStatus.TO_DO]: data.filter(
        (task) => task.taskStatus === taskStatus.TO_DO,
      ),
      [taskStatus.IN_PROGRESS]: data.filter(
        (task) => task.taskStatus === taskStatus.IN_PROGRESS,
      ),
      [taskStatus.DONE]: data.filter(
        (task) => task.taskStatus === taskStatus.DONE,
      ),
    };
  }, [data]);

  return (
    <div className="kanban-body">
      <Header />
      <NewTask />
      <KanBoardContainer isLoading={isLoading} isError={isError}>
        <SwimLane
          tasks={groupedTasks[taskStatus.TO_DO]}
          title="To Do"
          id={taskStatus.TO_DO}
        />
        <SwimLane
          tasks={groupedTasks[taskStatus.IN_PROGRESS]}
          title="In Progress"
          id={taskStatus.IN_PROGRESS}
        />
        <SwimLane
          tasks={groupedTasks[taskStatus.DONE]}
          title="Done"
          id={taskStatus.DONE}
        />
      </KanBoardContainer>
    </div>
  );
}

export default App;
