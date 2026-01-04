import "./App.css";
import { Outlet } from "react-router";
import Navber from "./components/navber/Navber";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <>
      <header>
        <Navber></Navber>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
