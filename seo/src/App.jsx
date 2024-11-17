import { useSelector } from "react-redux";
import Routes from "./routes";

const App = () => {
  const { theme } = useSelector((state) => state?.common);
  return (
    <div className={theme ? "dark" : ""}>
      <Routes />
    </div>
  );
};

export default App;
