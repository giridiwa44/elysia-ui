import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = "default", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={clsx(
          "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
          variant === "default" && "bg-pink-100 text-dark hover:bg-pink-700",
          variant === "destructive" && "bg-pink-400 text-white hover:bg-pink-600",
          variant === "outline" && "border border-gray-300 hover:bg-gray-100",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
