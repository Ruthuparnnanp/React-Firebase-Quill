import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import EditPage from "./EditPage";
function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
