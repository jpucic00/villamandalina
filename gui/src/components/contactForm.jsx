import React, { useEffect } from "react";
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
      pending: "Email is being sent please wait...",
      success: "Email sent",
      error:
        "There was an issue with sending of the email, please try again later",
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
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.message) {
          errors.message = "Required";
        }
        if (!validateCaptcha(values.userCaptchaInput, true)) {
          errors.userCaptchaInput = "Wrong captcha";
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
            placeholder="Enter your name"
            className={`contactInput ${deviceCheck(width)}`}
          />
          <div className="formErrorMessage">{errors.name}</div>
          <Field
            type="email"
            name="email"
            placeholder="Enter a valid email adress"
            className={`contactInput ${deviceCheck(width)}`}
          />
          <div className="formErrorMessage">{errors.email}</div>
          <Field
            type="textarea"
            as="textarea"
            name="message"
            placeholder="Enter your message..."
            className={`contactText ${deviceCheck(width)}`}
          />
          <div className="formErrorMessage">{errors.message}</div>
          <LoadCanvasTemplate reloadColor="white" />
          <Field
            placeholder="Enter Captcha Value"
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
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
