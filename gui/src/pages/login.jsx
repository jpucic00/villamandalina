import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../assets/style/login.css";

import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (user) history.push("/");
  }, [user]); //eslint-disable-line
  return (
    <div className="login">
      <div className={`login__container ${deviceCheck(width)}`}>
        {loading ? (
          <div className="spinnerMask">
            <div className="spinner"></div>
          </div>
        ) : null}
        <h3 className={`loginTitle ${deviceCheck(width)}`}>Login</h3>
        <input
          type="text"
          className={`login__textBox email ${deviceCheck(width)}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={`login__textBox password ${deviceCheck(width)}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="errorMessage">
          {loginError ? "Wrong email or password" : ""}
        </div>
        <button
          className={`login__btn ${deviceCheck(width)}`}
          type="submit"
          onClick={() => {
            setLoading(true);
            logInWithEmailAndPassword(email, password)
              .then(() => {
                setLoginError(false);
                setLoading(false);
              })
              .catch(() => {
                setLoginError(true);
                setLoading(false);
              });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default Login;
