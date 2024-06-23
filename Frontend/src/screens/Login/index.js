import React, { useState, useEffect } from "react";
import "./index.css";
import { login } from "../../redux/reducer/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const { users } = useSelector((state) => state.auth);

  function handleCallbackResponse(response) {
    console.log("encoded JWT ID Token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    console.log(user); 
    handleSubmit();
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "833485182868-v508fdh9qnt2mtkf5njoconagh68pi6c.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: 'outline', size: 'large' }
    );
  }, [user]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    // event.preventDefault();
    const payload = users.find(
      (user) => Object.keys(user).length != 0
    );
    if (payload) {
      dispatch(login(payload));
      navigate("/");
    } else {
      alert("Invalid credentials !!");
      navigate("/");
    }
    // const name = {user.name};
  };
  return (
    <div className="login">
      <form className="login__form" onSubmit={(event) => handleSubmit(event)}>
        <h1>Email Communication System</h1>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(event) => handleUsernameChange(event)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => handlePasswordChange(event)}
        />
        <button type="submit" className="submit__button">
          Login
        </button>
      </form>
      <div className="separator">or</div>
      <div id="signInDiv" className="google-signin"></div>
    </div>
  );
};

export default Login;
