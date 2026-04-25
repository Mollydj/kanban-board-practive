import { Button } from "welcome-ui/Button";
import { Field } from "welcome-ui/Field";
import { InputText } from "welcome-ui/InputText";
import { useCreateKanbanTask } from "../../Hooks/createKanbanTask";
import { useState } from "react";
import { taskStatus } from "../../Hooks/getKanbanTasks";
import "./NewTask.css";

export const NewTask = () => {
  const { mutate: addTask } = useCreateKanbanTask();
  const [taskName, setTaskName] = useState("");

  const handleCreateTask = (event) => {
    event.preventDefault();
    const newTask = {
      taskStatus: taskStatus.TO_DO,
      taskName: taskName,
    };
    setTaskName("")
    addTask(newTask);
  };

  return (
    <div className="kanban-add-task">
      <Field label={null} hideLabel>
        <InputText
          placeholder="Write your next task here..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </Field>
      <Button onClick={handleCreateTask}>Create Task</Button>
    </div>
  );
};

export default NewTask;
