import "./App.css";
import Login from "./components/login";
import SignUp from "./components/sign up";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AddCV from "./pages/addCv";
import EditCv from "./pages/editCv";
import Preview from "./pages/preview";
import NotFound from "./pages/notfound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" Component={SignUp}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/" Component={Dashboard}></Route>
        <Route path="/addcv/:template" Component={AddCV}></Route>
        <Route path="/editcv/:id/:template" Component={EditCv}></Route>
        <Route path="/preview/:id/:template" Component={Preview}></Route>
        <Route path="*" Component={NotFound}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
