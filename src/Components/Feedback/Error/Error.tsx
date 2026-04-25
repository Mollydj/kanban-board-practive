import "./Error.css";
import { Text } from "welcome-ui/Text";

export const Error = () => {
  return (
    <div className="error-container">
      <Text aria-label="Error message" variant="heading-md-strong">Error</Text>
      <span>Tasks could not be loaded. Please try again later.</span>
    </div>
  );
};

export default Error;
