import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, logInWithEmailAndPassword, getDates, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../assets/style/login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.push("/");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {!user ? (
          <button
            className="login__btn"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
        ) : (
          <button className="login__btn" onClick={() => logout()}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
export default Login;
