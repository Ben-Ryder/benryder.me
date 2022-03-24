import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

import FormRow from "../elements/FormRow";
import FormInput from "../elements/FormInput";
import FormSubmitButton from "../elements/FormSubmitButton";
import FormTextArea from "../elements/FormTextArea";
import FormError from "../elements/FormError";

const ContactForm = () => {
  const contactFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("Please fill in this field so I know what to call you."),
    email: Yup.string()
      .required("Please fill in this field. I may want to respond to you and I'll need an email address for that.")
      .email("That doesn't look like a valid email address."),
    subject: Yup.string()
      .required("Please fill in this field. It's useful to know what you're contacting me about."),
    message: Yup.string()
      .required("Please fill in this field. You want to actually send me a message right? :)"),
    honeypot: Yup.string(),
    "g-recaptcha-key": Yup.string()
      .required("Please prove you are human.")
  });

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
    "g-recaptcha-key": ""
  };
  const [formMessage, setFormMessage] = useState(null);

  const recaptchaRef = React.useRef(null);

  const contactFormSubmit = async (values, actions) => {
    return axios.post(
      "",
      new URLSearchParams({"form-name": "contact", ...values}).toString(),
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
      })
      .then(() => {
        setFormMessage({
          type: "success",
          message: "Thank you for getting in touch. I'll try to get back to you as soon as possible."
        });

        // Reset the form
        actions.resetForm();
        if (recaptchaRef && recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      })
      .catch(() => {
        setFormMessage({
          type: "error",
          message: "There was an error submitting the form, please try again."
        })
      })
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactFormSchema}
      onSubmit={contactFormSubmit}
    >
      {({ errors, touched, isSubmitting, values, submitCount, validateForm }) => (
        <Form
          data-netlify="true"
          netlify-honeypot="honeypot"
          name="contact"
        >
          <FormRow>
            <FormInput
              type="text"
              id="name"
              name="name"
              label="Name"
              error={errors.name && touched.name ? errors.name : null}
            />
          </FormRow>
          <FormRow>
            <FormInput
              type="email"
              id="email"
              name="email"
              label="Email Address"
              error={errors.email && touched.email ? errors.email : null}
            />
          </FormRow>
          <FormRow>
            <FormInput
              type="text"
              id="subject"
              name="subject"
              label="Subject"
              error={errors.subject && touched.subject ? errors.subject : null}
            />
          </FormRow>
          <FormRow>
            <FormTextArea
              type="text"
              id="message"
              name="message"
              label="Message"
              error={errors.message && touched.message ? errors.message : null}
              rows={6}
            />
          </FormRow>
          <FormRow className="hidden">
            <FormInput
              type="text"
              id="honeypot"
              name="honeypot"
              label="honeypot"
            />
          </FormRow>
          <FormRow>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={ process.env.GATSBY_CAPTCHA_SITE_KEY }
              onChange={(value) => {
                // Manually set value and trigger formik to validate.
                values["g-recaptcha-key"] = value;
                return validateForm();
              }}
              onExpired={() => {
                // Manually reset value and trigger validation to show error message.
                values["g-recaptcha-key"] = "";
                return validateForm();
              }}
            />
            {(errors["g-recaptcha-key"] && submitCount > 0) &&
              <FormError>{ errors["g-recaptcha-key"] }</FormError>
            }
          </FormRow>
          {formMessage &&
            <FormRow>
              {formMessage.type === "success"
                ? <p className="text-sm text-green-600">{ formMessage.message }</p>
                : <p className="text-sm text-red-600">{ formMessage.message }</p>
              }
            </FormRow>
          }
          <FormRow className="mt-4 flex justify-end">
            <FormSubmitButton type="submit" isSubmitting={isSubmitting}>Send</FormSubmitButton>
          </FormRow>
        </Form>
      )}
    </Formik>
  )
}

export default ContactForm;
