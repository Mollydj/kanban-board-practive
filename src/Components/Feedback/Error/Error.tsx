import "./Error.css";
import { Text } from "welcome-ui/Text";

export const Error = () => {
  return (
    <div className="error-container">
      <Text variant="heading-md-strong">Error</Text>
      <span>Tasks could not be loaded. Please try again later.</span>
    </div>
  );
};

export default Error;
