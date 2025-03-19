import { format } from "date-fns";
import { forwardRef, useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import Label from "../Label";
import Calendar from "../Calendar";
import Button from "../Button";
import Popover from "../Popover";
import { cn } from "../../lib/utils";

export interface DatePickerProps {
  value?: Date;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  errorDetails?: { message: string };
  handleChange?: (data: Date) => void;
}

const DateField = forwardRef<HTMLDivElement, DatePickerProps>(({ label, value, required = false, placeholder, disabled, handleChange, errorDetails }, ref) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  return (
    <div className="w-full items-center">
      {label && (
        <Label>
          {label} {!!required && <sup className="text-red-500">*</sup>}
        </Label>
      )}

      <Popover
        TriggerComponent={
          <Button
            disabled={disabled}
            variant="outline"
            className={cn(
              "!justify-start text-left font-normal w-full text-sm",
              !date && "text-muted-foreground",
              label && "mt-1",
              errorDetails?.message && "border-red-600 text-red-600"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {date ? format(date, "LLL dd, yyyy") : placeholder ?? "Pick a date"}
            </span>
          </Button>
        }
        ContentComponent={
          <Calendar
            mode="single"
            selected={date}
            onSelect={(data) => {
              setDate(data);
              data && handleChange?.(data);
            }}
            initialFocus
          />
        }
      />

      {!!errorDetails?.message && <p className="text-sm text-red-600 font-semibold m-0 mt-1 p-0">{errorDetails.message}</p>}
    </div>
  );
});

DateField.displayName = "DateField";

export default DateField;
