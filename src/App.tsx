import { ToastContainer } from "react-toastify";
import "./App.css";
import BaseRouter from "./routers/BaseRouter";

function App() {
  return (
    <>
      <ToastContainer />;
      <BaseRouter />;
    </>
  );
}

export default App;
