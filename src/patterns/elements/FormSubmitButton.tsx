import React, {ComponentProps} from "react";
import classNames from "classnames";

// Assets
import { Loader2 as LoadingIcon } from "lucide-react";

export interface FormSubmitButton extends ComponentProps<'button'> {
    isSubmitting: boolean,
}

export function FormSubmitButton(props: FormSubmitButton) {
  // Filter out custom props before passing to element.
  const { className, isSubmitting, ...filteredProps } = props;

  return (
    <button {...filteredProps} className={
      classNames(
        "rounded-md py-2 px-5 text-brand-text-secondary flex font-bold",
        {
          "bg-gray-400": props.isSubmitting,
          "bg-brand hover:bg-brand-accent": !props.isSubmitting,
        },
        className
      )}
    >
      { props.children }
      {props.isSubmitting &&
        <LoadingIcon className="animate-spin ml-2" />
      }
    </button>
  )
}
