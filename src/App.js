import './App.css';
import Project from "./Project";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";

function App() {
  return (
    <HashRouter>
      <div>
      <Routes>
          <Route path="/"         element={<Navigate to="/Project"/>}/>
          <Route path="/Project/*"   element={<Project/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
