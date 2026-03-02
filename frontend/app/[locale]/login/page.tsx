import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import LoginPage from "@/components/LoginPage";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function Login({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <Layout>
      <LoginPage />
    </Layout>
  );
}
