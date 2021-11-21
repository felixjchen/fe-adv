import Game from "../components/GameComponent";
import Index from "../components/IndexComponent";
import About from "../components/AboutComponent";
import { Routes, Route } from "react-router-dom";
import React from "react";

const MyRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/game" element={<Game />} />
    <Route path="/about" element={<About />} />
  </Routes>
);

export default MyRoutes;
