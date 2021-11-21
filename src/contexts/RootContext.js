import { createContext } from "react";

const RootContext = createContext({});
const RootContextProvider = (props) => {
  return (
    <RootContext.Provider value={props.value}>
      {props.children}
    </RootContext.Provider>
  );
};
export { RootContext, RootContextProvider };
