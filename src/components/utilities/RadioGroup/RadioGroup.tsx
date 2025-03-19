import * as React from "react";

import { cn } from "../../lib/utils";
import Label from "../Label";
import { RadioGroup, RadioGroupItem } from "../unstyled/Radio";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  secondaryLabel?: string;
  classes?: { label?: string; secondaryLabel?: string; errorDetails?: string; RadioGroupItem?: string; RadioGroupItemLabel?: string; RadioGroupItemCircle?: string };
  required?: boolean;
  errorDetails?: { message: string };
  value?: string;
  items: {value: string; label: string}[] | [];
  onValueChange?: (e:string) => void;
  direction?: "horizontal" | "vertical";
}

const RadioGroups = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, classes = {}, secondaryLabel, required, value, className, errorDetails, direction, onValueChange, items = [] }, ref) => {
    return (
      <div className="w-full">
        <div className={`flex flex-col gap-[6px] pb-[15px] ${className}`}>
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
        <RadioGroup defaultValue={value} onValueChange={onValueChange} className={direction === 'horizontal' ? `!flex !justify-start !gap-6 !flex-wrap`: ' gap-[20px]'}>
            {items?.map((item) => (
                <div className={`flex ${direction === 'horizontal' ? 'items-start' : 'items-center'} space-x-2 w-[230px] ${classes?.RadioGroupItem}`} key={item?.value}>
                <RadioGroupItem value={item?.value} id={item?.value} className={`${errorDetails?.message ? "!border-destructive !text-destructive" : ""} ${classes?.RadioGroupItemCircle}`} />
                <Label htmlFor={item.value} className={`!ml-7 !font-[400] ${classes?.RadioGroupItemLabel}`}>{item.label}</Label>
                </div>
            ))}
        </RadioGroup>

        {!!errorDetails?.message && (
          <p className={cn("text-sm text-red-600 font-semibold m-0 mt-[15px] p-0", classes?.errorDetails)}>{errorDetails.message}</p>
        )}
      </div>
    );
  }
);

RadioGroups.displayName = "RadioGroup";

export default RadioGroups;
