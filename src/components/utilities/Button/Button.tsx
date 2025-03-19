import * as React from "react";
import { Loader } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import Tooltip from "../Tooltip";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-none bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
        destructive: "border-none bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        outline: "border border-solid border-border shadow-sm bg-background hover:bg-accent/60",
        secondary: "border-none bg-secondary/80 text-secondary-foreground shadow-sm hover:bg-secondary",
        ghost: "border-none bg-transparent hover:shadow-none hover:bg-accent",
      },
      size: {
        default: "min-w-[7rem] h-10 px-4 py-2",
        sm: "min-w-[7rem] h-9 px-3",
        lg: "min-w-[7rem] h-11 px-8",
        icon: "h-8 w-8",
        free: "min-w-fit h-10 px-4 py-2",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-[20rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  href?: string;
  disabled?: boolean;
  asChild?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  tooltipTitle?: string;
  classes?: { tooltipContainer?: string };
  styles?: { tooltipContainer?: React.CSSProperties };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, href, variant, rounded, disabled, loading, size, asChild = false, tooltipTitle, startIcon, endIcon, styles, classes, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return tooltipTitle ? (
      <Tooltip asChild={true} title={tooltipTitle}>
        <div className={cn(classes?.tooltipContainer)} style={{ ...styles?.tooltipContainer }}>
          <Comp className={cn(buttonVariants({ variant, size, rounded, className }))} ref={ref} {...props} disabled={loading || disabled}>
            {loading ? (
              <Loader className="animate-spin h-5 w-5" />
            ) : (
              <>
                {startIcon && startIcon}
                {children}
                {endIcon && endIcon}
              </>
            )}
          </Comp>
        </div>
      </Tooltip>
    ) : (
      <Comp className={cn(buttonVariants({ variant, size, rounded, className }))} ref={ref} {...props} disabled={loading || disabled}>
        {loading ? (
          <Loader className="animate-spin h-5 w-5" />
        ) : (
          <>
            {startIcon && startIcon}
            {children}
            {endIcon && endIcon}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
export default Button;
