import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant: "primary" | "ghost";
  glyph?: ReactNode;
  children: ReactNode;
}

/** Blueprint CTA — mono caps, animated glyph. Renders as an anchor. */
export function Button({ variant, glyph, children, ...rest }: ButtonProps) {
  return (
    <a className={`btn ${variant}`} {...rest}>
      {children}
      {glyph && (
        <span className="gly" aria-hidden="true">
          {glyph}
        </span>
      )}
    </a>
  );
}
