import "./Auth.css";
import dummy from "../../images/P1.png";
import Input from "../../shared/components/FormElementts/Input";

const Auth = () => {
  const authSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="formContainer">
      <img src={dummy} alt="login vector" />
      <form
        onSubmit={authSubmitHandler}
        className="formLayout"
        autoComplete="off"
      >
        <h3>Member Login</h3>
        <Input element="input" id="text" type="text" label="username"/>
        <Input element="input" id="password" type="password" label="password"/>
        <div className="pass">ForgotPassword</div>
        <input type="submit" value="Login" />
        <div className="signUp">
          <h4>Not a member? Signup</h4>
        </div>
      </form>
    </div>
  );
};

export default Auth;
