import MyRoutes from "../routes/routes";
import { BrowserRouter } from "react-router-dom";
import Nav from "./NavComponent";
import React from "react";

const Root = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Nav></Nav>
      <MyRoutes></MyRoutes>
    </BrowserRouter>
  </React.StrictMode>
);

export default Root;
