import { useState } from "react";
import "./NewTask.css";

const NewTask = (props) => {
  const [inputValue, setInputValue] = useState("");
  const formHandler = (e) => {
    e.preventDefault();
    console.log(inputValue);
    props.onAdd({ id: Math.random().toString(), title: inputValue });
    setInputValue("");
  };
  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="inputForm">

      <form onSubmit={formHandler}>
        <div className="inputText">
          <input
          type="text"
          required
          onChange={inputHandler}
          value={inputValue}
          />
        </div>
        <div className="submitButton"></div>
      </form>
    </div>
  );
};

export default NewTask;
