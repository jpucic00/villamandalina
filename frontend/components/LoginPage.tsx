"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { logInWithEmailAndPassword } from "@/api";
import { useAuth } from "@/AuthContext";
import { toast } from "react-toastify";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const t = useTranslations();
  const { width } = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/calendar");
  }, [user]); // eslint-disable-line

  return (
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
          toast.error(t("toast.loginFailed"));
        }
      }}
    >
      <div className={`login__container ${deviceCheck(width)}`}>
        {loading && (
          <div className="spinnerMask">
            <div className="spinner"></div>
          </div>
        )}
        <h1 className={`loginTitle ${deviceCheck(width)}`}>{t("login.title")}</h1>
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
  );
}
