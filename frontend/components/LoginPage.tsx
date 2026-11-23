"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { logInWithEmailAndPassword } from "@/api";
import { useAuth } from "@/AuthContext";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/calendar");
  }, [user]); // eslint-disable-line

  return (
    <form
      className="container login"
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
      <div className="login__card">
        {loading && (
          <div className="spinnerMask">
            <div className="spinner"></div>
          </div>
        )}
        <h1 className="h2">{t("login.title")}</h1>
        <input
          type="email"
          name="e-mail"
          className="field"
          aria-label={t("login.emailPlaceholder")}
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("login.emailPlaceholder")}
        />
        <input
          name="password"
          type="password"
          className="field"
          aria-label={t("login.passwordPlaceholder")}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("login.passwordPlaceholder")}
        />
        <button className="btn btn--ink" type="submit">
          {t("login.button")}
        </button>
      </div>
    </form>
  );
}
