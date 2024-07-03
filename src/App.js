import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import AddmoviePage from "./Pages/AddmoviePage";
import EditmoviePage from "./Pages/EditmoviePage";
import DetailPage from "./Pages/DetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/movie-details" element={<DetailPage />} />
          <Route path="/addmovie" element={<AddmoviePage />} />
          <Route path="/editmovie" element={<EditmoviePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
