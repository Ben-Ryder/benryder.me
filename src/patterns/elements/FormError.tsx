import React from "react";
import {StrictReactNode} from "../../types/strict-react";

export interface FormErrorProps {
  children: StrictReactNode
}

export function FormError(props: FormErrorProps) {
  return (
      <p className="mt-1 text-sm text-red-500">{ props.children }</p>
  )
}
