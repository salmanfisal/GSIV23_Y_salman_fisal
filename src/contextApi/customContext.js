import { createContext, useContext, useState } from "react";

let customContext = createContext();
export let GlobalContext = () => {
  return useContext(customContext);
};
export let UserContext = ({ children }) => {
  let [query, setQuery] = useState([]);
  let [input,setInput] = useState("")

let handleSearch = (id) => {
    setQuery(id);
  };
  let inputData = (id)=>{
    setInput(id)
    console.log(input)
  }
  return (
    <customContext.Provider value={{ query, handleSearch,inputData}}>
      {children}
    </customContext.Provider>
  );
};
