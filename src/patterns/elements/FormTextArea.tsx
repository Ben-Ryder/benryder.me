import React, {ComponentProps} from "react";
import { Field } from 'formik';
import classNames from "classnames";

import {FormError} from "./FormError";

export interface FormTextAreaProps extends ComponentProps<'textarea'> {
    label: string,
    error?: any
}

export function FormTextArea(props: FormTextAreaProps) {
  return (
    <>
      {props.label && props.id &&
        <label className="font-bold text-brand-text-secondary" htmlFor={props.id}>{props.label}</label>
      }
      <Field
        {...props}
        as="textarea"
        className={classNames(
          "mt-1 block w-full rounded-md outline-none",
          "bg-brand-background-primary border-2 text-brand-text-secondary",
          "focus:ring-0 focus:border-brand",
          {
            "border-red-500": props.error,
            "border-brand-interface-secondary hover:border-brand-interface-primary": !props.error
          },
          props.className,
        )}
      />
      {props.error &&
        <FormError>{props.error}</FormError>
      }
    </>
  )
}
