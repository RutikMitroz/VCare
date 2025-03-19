import * as React from "react";

import { cn } from "../../lib/utils";
import Label from "../Label";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label?: string;
  secondaryLabel?: string;
  required?: boolean;
  errorDetails?: { message: string };
  value?: string | number | readonly string[] | undefined;
  classes?: {label?: string, secondaryLabel?: string}
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ id, label, secondaryLabel, classes = {}, required, className, errorDetails, ...props }, ref) => {
  return (
    <div>
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
      <textarea
        className={cn(
          label && "mt-1",
          errorDetails?.message && "border-red-600 text-red-600 focus-visible:!ring-red-600",
          "flex min-h-[80px] w-full font-inherit rounded-md border border-input bg-background p-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset transition disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />

      {!!errorDetails?.message && <p className="text-sm text-red-600 font-semibold m-0 mt-1 p-0">{errorDetails.message}</p>}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
