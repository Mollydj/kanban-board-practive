import { Loader } from "welcome-ui/Loader";
import "./Loading.css";

export const Loading = () => {
  return (
    <div className="error-container" aria-label="Loading Container">
      <Loader />
    </div>
  );
};

export default Loading;
