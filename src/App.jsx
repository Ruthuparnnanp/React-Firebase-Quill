import { Route, Routes } from "react-router-dom";
import { ToastProvider } from "react-hot-toast";
import "./App.css";
import Home from "./Home";
import EditPage from "./EditPage";
function App() {
  return (
    <>
      <Routes>
        <ToastProvider>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </ToastProvider>
      </Routes>
    </>
  );
}

export default App;
