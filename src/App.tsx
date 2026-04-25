import Header from "./Components/Header/Header";
import NewTask from "./Components/NewTask/NewTask";
import KanbanBoard from "./Components/KanbanBoard/KanbanBoard";
import SwimLane from "./Components/KanbanBoard/SwimLane";
import { useKanbanTasks } from "./Hooks/getKanbanTasks";
import { useMemo } from "react";
import { TASK_STATUS } from "./types/task";
import Loading from "./Components/Feedback/Loading/Loading";
import Error from "./Components/Feedback/Error/Error";
import { lanes } from "./Components/KanbanBoard/SwimLanes";

function App() {
  const { data = [], isLoading, isError } = useKanbanTasks();
  const groupedTasks = useMemo(() => {
    return {
      [TASK_STATUS.TO_DO]: data.filter(
        (task) => task.taskStatus === TASK_STATUS.TO_DO,
      ),
      [TASK_STATUS.IN_PROGRESS]: data.filter(
        (task) => task.taskStatus === TASK_STATUS.IN_PROGRESS,
      ),
      [TASK_STATUS.DONE]: data.filter(
        (task) => task.taskStatus === TASK_STATUS.DONE,
      ),
    };
  }, [data]);

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="kanban-body">
      <Header />
      <NewTask />
      <KanbanBoard>
        {lanes.map((lane) => (
          <SwimLane
            tasks={groupedTasks[lane.key]}
            title={lane.title}
            id={lane.key}
            key={lane.key}
          />
        ))}
      </KanbanBoard>
    </div>
  );
}

export default App;
