import React, {ComponentProps} from "react";
import { Field } from 'formik';
import classNames from "classnames";

import { FormError } from "./FormError";

export interface FormInputProps extends ComponentProps<'input'> {
    label: string,
    error?: string
}

export function FormInput(props: FormInputProps) {
    const { label, error, ...filteredProps } = props;

    return (
        <>
          {props.label && props.id &&
            <label
              className={
                classNames(
                  "font-bold text-brand-text-secondary",
                  {
                    "hidden": props.type === "hidden"
                  }
                )
              }
              htmlFor={props.id}
            >
              {props.label}
            </label>
          }
          <Field
            {...filteredProps}
            className={classNames(
              "mt-1 block w-full rounded-md outline-none",
              "bg-brand-background-primary border-2  text-brand-text-secondary",
              "focus:ring-0 focus:border-brand",
              {
                "border-brand-red": props.error,
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
