import IndexContext from "../contexts/IndexContext";
import { useContext } from "react";

const About = (props) => {
  let index_context = useContext(IndexContext);

  return <h1>About yadayada {index_context.user_email}</h1>;
};

export default About;
