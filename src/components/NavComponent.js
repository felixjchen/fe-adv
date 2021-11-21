import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { RootContext } from "../contexts/RootContext";
import { Button } from "@mui/material";

const Nav = () => {
  let index_context = useContext(RootContext);
  return (
    <>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/game">Game</Link>
        <Button
          variant="contained"
          onClick={index_context.signOut}
          style={{ float: "right" }}
        >
          Sign Out
        </Button>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
