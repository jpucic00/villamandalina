import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import "../assets/style/contact.css";
import { Formik, Field, Form } from "formik";
import emailjs from "@emailjs/browser";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { toast } from "react-toastify";

export default function ContactForm() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  emailjs.init("TO7HNsppourbFcFDu");

  useEffect(() => {
    loadCaptchaEnginge(6);
  });

  const SendEmail = (templateParams, resetForm, setSubmitting) =>
    new Promise((resolve, reject) => {
      emailjs
        .send(
          "service_s6zkdbo",
          "template_12fr9ge",
          templateParams,
          "TO7HNsppourbFcFDU"
        )
        .then(() => {
          resetForm();
          setSubmitting(false);
          loadCaptchaEnginge(6);
          resolve();
        })
        .catch(() => {
          setSubmitting(false);
          reject();
        });
    });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    let templateParams = {
      name: values.name,
      email: values.email,
      message: values.message,
    };

    toast.promise(SendEmail(templateParams, resetForm, setSubmitting), {
      pending: t("toast.emailPending"),
      success: t("toast.emailSent"),
      error: t("toast.emailError"),
    });
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", message: "", userCaptchaInput: "" }}
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = t("contact.form.required");
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = t("contact.form.invalidEmail");
        }
        if (!values.name) {
          errors.name = t("contact.form.required");
        }
        if (!values.message) {
          errors.message = t("contact.form.required");
        }
        if (!validateCaptcha(values.userCaptchaInput, true)) {
          errors.userCaptchaInput = t("contact.form.wrongCaptcha");
        }
        return errors;
      }}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form className={`contactForm ${deviceCheck(width)}`}>
          <Field
            type="input"
            name="name"
            placeholder={t("contact.form.namePlaceholder")}
            className={`contactInput ${deviceCheck(width)}`}
          />
          <div className="formErrorMessage">{errors.name}</div>
          <Field
            type="email"
            name="email"
            placeholder={t("contact.form.emailPlaceholder")}
            className={`contactInput ${deviceCheck(width)}`}
          />
          <div className="formErrorMessage">{errors.email}</div>
          <Field
            type="textarea"
            as="textarea"
            name="message"
            placeholder={t("contact.form.messagePlaceholder")}
            className={`contactText ${deviceCheck(width)}`}
          />
          <div className="formErrorMessage">{errors.message}</div>
          <LoadCanvasTemplate reloadColor="white" />
          <Field
            placeholder={t("contact.form.captchaPlaceholder")}
            id="user_captcha_input"
            name="userCaptchaInput"
            type="text"
            className={`contactInput ${deviceCheck(width)}`}
          />
          <div className="formErrorMessage">{errors.userCaptchaInput}</div>
          <button
            className={`contactSubmit ${deviceCheck(width)}`}
            type="submit"
            disabled={isSubmitting}
          >
            {t("contact.form.submit")}
          </button>
        </Form>
      )}
    </Formik>
  );
}
