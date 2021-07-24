import { useReducer } from "react";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.val, isValid: true };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });
  const inputChangehandler = (event) => {
    console.log(event.target.value);
    dispatch({
      type: "CHANGE",
      val: event.target.value,
    });
  };

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        id={props.id}
        onChange={inputChangehandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        rows={props.rows || 3}
        id={props.id}
        onChange={inputChangehandler}
        value={inputState.value}
      />
    );
  return (
    <div className="textField">
      {element}
      <label htmlFor={props.label} id={props.id}>
        {props.label}
      </label>
      <div className={`${inputState.isValid ? "blackLine" : "redLine"}`}></div>
    </div>
  );
};

export default Input;
