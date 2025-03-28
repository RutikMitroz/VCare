import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "../../lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",

        caption: "flex justify-center relative items-center",
        caption_label: "text-sm font-medium",
        caption_dropdowns: "flex gap-2",
        dropdown_month: "[&_select]:h-7 [&_select]:rounded [&_select]:cursor-pointer",
        dropdown_year: "[&_select]:h-7 [&_select]:rounded [&_select]:cursor-pointer",

        nav: "space-x-1 flex items-center",
        nav_button:
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-solid border-border rounded-sm flex items-center justify-center",
        nav_button_previous: "absolute left-1 cursor-pointer [&_svg]:h-2",
        nav_button_next: "absolute right-1 cursor-pointer [&_svg]:h-2",
        
        table: "w-full border-collapse space-y-1",
        
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        
        day: "rounded-md border-transparent overflow-hidden h-9 w-9 p-0 font-normal aria-selected:opacity-100 cursor-pointer hover:bg-accent",
        day_range_end: "day-range-end",
        day_selected:
          "!bg-tertiary !text-tertiary-foreground hover:bg-tertiary hover:text-tertiary-foreground focus:bg-tertiary focus:text-tertiary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        
        ...classNames,
      }}
      captionLayout="dropdown"
      fromYear={new Date().getFullYear() - 100}
      toYear={new Date().getFullYear()}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export default Calendar;
