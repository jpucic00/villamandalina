import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { logInWithEmailAndPassword } from "../api";
import { useAuth } from "../AuthContext";
import "../assets/style/login.css";

import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (user) history.push("/calendar");
  }, [user]); //eslint-disable-line
  return (
    <>
      <form
        className="login"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          try {
            const userData = await logInWithEmailAndPassword(email, password);
            updateUser(userData);
            setLoading(false);
            toast.success(t("toast.loggedInSuccess"));
          } catch {
            setLoading(false);
            console.log("error");
            toast.error(t("toast.loginFailed"));
          }
        }}
      >
        <div className={`login__container ${deviceCheck(width)}`}>
          {loading ? (
            <div className="spinnerMask">
              <div className="spinner"></div>
            </div>
          ) : null}
          <h3 className={`loginTitle ${deviceCheck(width)}`}>{t("login.title")}</h3>
          <input
            type="email"
            name="e-mail"
            className={`login__textBox email ${deviceCheck(width)}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("login.emailPlaceholder")}
          />
          <input
            name="password"
            type="password"
            className={`login__textBox password ${deviceCheck(width)}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("login.passwordPlaceholder")}
          />

          <button className={`login__btn ${deviceCheck(width)}`} type="submit">
            {t("login.button")}
          </button>
        </div>
      </form>
    </>
  );
}
export default Login;
