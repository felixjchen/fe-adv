import { RootContext } from "../contexts/RootContext";
import React, { useContext } from "react";

const About = (props) => {
  let index_context = useContext(RootContext);

  return <h1>About yadayada {index_context.user_email}</h1>;
};

export default About;
