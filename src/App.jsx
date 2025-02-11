import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./common/Navbar";
import Banner from "./common/Banner"
import Footer from "./common/Footer"
function Dashboard(){
  return(
    <>
    <Navbar/>
    <Banner/>
    <Footer/>
    </>
  )
}

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

