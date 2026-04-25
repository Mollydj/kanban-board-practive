import { Text } from "welcome-ui/Text";
import "./Header.css";

export const Header = () => {
  return (
    <div className="kanban-header">
      <Text aria-label="Kanban Board Header" variant="display-md">Kanban Board</Text>
    </div>
  );
};

export default Header;
