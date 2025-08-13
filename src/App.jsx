import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "../src/components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetProducts from "./pages/GetProducts";
import PostProducts from "./pages/PostProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/getapi" element={<GetProducts />} />
          <Route path="/postapi" element={<PostProducts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
