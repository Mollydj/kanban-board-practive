import { Button } from "welcome-ui/Button";
import { Field } from "welcome-ui/Field";
import { InputText } from "welcome-ui/InputText";
import { useCreateKanbanTask } from "../../Hooks/createKanbanTask";
import { useState } from "react";
import "./NewTask.css";
import { TASK_STATUS } from "../../types/task";

export const NewTask = () => {
  const { mutate: addTask } = useCreateKanbanTask();
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState(false);

  const handleSetTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleCreateTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!taskName.trim()) {
      setError(true);
      return null;
    }
    event.preventDefault();
    const newTask = {
      taskStatus: TASK_STATUS.TO_DO,
      taskName: taskName,
    };
    setTaskName("");
    setError(false);
    addTask(newTask);
  };

  return (
    <div className="kanban-add-task">
      <Field
        label={null}
        hideLabel
        error={error ? "Task name cannot be empty" : undefined}
      >
        <InputText
          aria-label="Task Input Field"
          placeholder="Write your next task here..."
          value={taskName}
          onChange={handleSetTaskName}
        />
      </Field>
      <Button aria-label="Submit New Task" type="submit" onClick={handleCreateTask}>
        Create Task
      </Button>
    </div>
  );
};

export default NewTask;
