import { Button } from "welcome-ui/Button";
import { Field } from "welcome-ui/Field";
import { InputText } from "welcome-ui/InputText";

export const NewTask = () => {
  return (
    <div className="kanban-add-task">
      <Field label={null} hideLabel>
        <InputText placeholder="Placeholder" />
      </Field>
      <Button>Create Task</Button>
    </div>
  );
};

export default NewTask;
