import React, {ComponentProps} from "react";
import { Link } from "gatsby";

export interface LinkComponentProps extends ComponentProps<'a'> {}

/**
 * A link component to dynamically create an internal or external link.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
export function LinkComponent(props: LinkComponentProps) {
  // If the link is internal, use Gatsby's link component
  if (props.href && props.href.startsWith("/")) {
    const { href, ref, ...otherProps } = props;

    return (
      <Link to={props.href} {...otherProps}>
        {props.children}
      </Link>
    );
  }
  else {
    const { href, ...otherProps } = props;

    return (
      <a href={props.href} {...otherProps}>
        {props.children}
      </a>
    );
  }
}
