import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../assets/style/login.css";

import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (user) history.push("/");
  }, [user]); //eslint-disable-line
  return (
    <>
      <form
        className="login"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          logInWithEmailAndPassword(email, password)
            .then(() => {
              setLoading(false);
              toast.success("Logged in successfully");
            })
            .catch(() => {
              setLoading(false);
              console.log("error");
              toast.error(
                "Log in failed, please check your email and password"
              );
            });
        }}
      >
        <div className={`login__container ${deviceCheck(width)}`}>
          {loading ? (
            <div className="spinnerMask">
              <div className="spinner"></div>
            </div>
          ) : null}
          <h3 className={`loginTitle ${deviceCheck(width)}`}>Login</h3>
          <input
            type="email"
            name="e-mail"
            className={`login__textBox email ${deviceCheck(width)}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            name="password"
            type="password"
            className={`login__textBox password ${deviceCheck(width)}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button className={`login__btn ${deviceCheck(width)}`} type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
}
export default Login;
