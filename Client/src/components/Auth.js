import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import GoogleLogin from "react-google-login";
// import axios from "axios";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const responseSuccessGoogle =async (res) => {
    console.log(res.tokenId);
    try{
      const response = await fetch("http://localhost:5000/api/users/googleLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId: res.tokenId }),
      });
      const responseData = await response.json();
      console.log(responseData);
      auth.login();
    } catch(err) {
      console.error(err);
    }
  };
  const responseErrorGoogle = (error) => {
    console.log("Google Authentication Failed");
  };
  return (
    <GoogleLogin
      clientId="1038471338156-g4mjutg9rcojd3u9su7f7rlhufo5rprk.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseSuccessGoogle}
      onFailure={responseErrorGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Auth;
