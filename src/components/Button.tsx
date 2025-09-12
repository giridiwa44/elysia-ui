import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import theme from "../lib/theme/elysia-theme";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = "default", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={clsx(
          "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
          variant === "default" && `${theme.primary.bg} ${theme.primary.text} ${theme.primary.hover}`,
          variant === "secondary" && `${theme.secondary.bg} ${theme.secondary.text} ${theme.secondary.hover}`,
          variant === "destructive" && `${theme.destructive.bg} ${theme.destructive.text} ${theme.destructive.hover}`,
          variant === "outline" && theme.outline,
          variant === "ghost" && theme.ghost,
          variant === "link" && theme.link,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
