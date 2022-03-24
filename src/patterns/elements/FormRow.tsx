import React from "react";
import classNames from "classnames";
import { StrictReactNode } from "../../types/strict-react";

export interface FormRowProps {
  className: string,
  children: StrictReactNode
}

export function FormRow(props: FormRowProps)  {
  return (
    <div {...props} className={classNames("mb-4", props.className)}>
      { props.children }
    </div>
  )
}
