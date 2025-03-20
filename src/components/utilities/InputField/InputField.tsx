import * as React from "react";
import clsx from "clsx";
import Label from "../Label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  secondaryLabel?: string;
  classes?: { label?: string; secondaryLabel?: string; errorDetails?: string; endIcon?: string };
  required?: boolean;
  errorDetails?: { message: string };
  value?: string | number | readonly string[] | undefined;
  endIcon?: React.ReactNode;
  onEndIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, classes = {}, secondaryLabel, required, className, errorDetails, type, endIcon, onEndIconClick, ...props }, ref) => {
    return (
      <div className="w-full">
        {(label || secondaryLabel) && (
          <div className="flex flex-col gap-[6px] pb-[7px]">
            {label && (
              <Label className={classes?.label} htmlFor={id}>
                {label} {!!required && <sup className="text-red-500">*</sup>}
              </Label>
            )}

            {secondaryLabel && (
              <Label className={`text-[#909090] !font-[300] ${classes?.secondaryLabel}`} htmlFor={id}>
                {secondaryLabel}
              </Label>
            )}
          </div>
        )}

        <div className="relative">
          <input
            type={type}
            className={clsx(
              label && "mt-1",
              errorDetails?.message && "!border-red-600 text-red-600 focus-visible:!ring-red-600",
              "flex h-10 w-full rounded-md border border-solid border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset transition disabled:cursor-not-allowed disabled:opacity-50",
              endIcon && "pr-[40px]",
              className
            )}
            ref={ref}
            {...props}
          />

          {endIcon && (
            <button
              type="button"
              className={clsx(
                "absolute top-1 right-1 flex items-center justify-center h-8 w-8 rounded-md bg-background border-[0px] border-solid border-input text-sm text-muted-foreground transition outline-none cursor-pointer ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset",
                classes?.endIcon
              )}
              onClick={onEndIconClick}
            >
              {endIcon}
            </button>
          )}
        </div>

        {!!errorDetails?.message && (
          <p className={clsx("text-sm text-red-600 font-semibold m-0 mt-1 p-0", classes?.errorDetails)}>
            {errorDetails.message}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
