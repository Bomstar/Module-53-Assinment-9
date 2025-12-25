import "./App.css";
import { Outlet } from "react-router";
import Navber from "./components/navber/Navber";

function App() {
  return (
    <>
      <header>
        <Navber></Navber>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
