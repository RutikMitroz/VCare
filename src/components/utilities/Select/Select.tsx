import { forwardRef, useCallback, useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import Label from "../Label";
import InputField from "../InputField";
import Button from "../Button";
import { cn } from "../../lib/utils";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../unstyled/Dropdown";
import { Select as UnstyledSelect, SelectItem, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "../unstyled/Select";

export type MenuItemBase = { id: string | number; icon?: React.ReactNode; value: string; title: string; subTitle?: string };

export type SelectMenuItem = {
  id: string | number;
  icon?: React.ReactNode;
  isGroup?: boolean;
  title: string;
  subTitle?: string;
  value: string;
  menuItems?: MenuItemBase[];
};

export interface SelectProps {
  label?: string;
  secondaryLabel?: string;
  required?: boolean;
  placeholder?: string;
  errorDetails?: { message: string };
  values?: string[] | null;
  handleChange: (val: any) => void;
  menuItems: SelectMenuItem[] | MenuItemBase[];
  classes?: { selectTriggerContainer?: string; selectContentContainer?: string; label?: string; secondaryLabel?: string; placeHolder?: string };
  styles?: { selectTriggerContainer?: React.CSSProperties; selectContentContainer?: React.CSSProperties };
  type?: "single" | "multi";
  endIcon?: React.ReactNode;
  // searchTerm?: string;
  setSearchTerm?: (val: string) => void;
  showSearch?: boolean;
  disabled?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      secondaryLabel,
      disabled,
      placeholder,
      values,
      // searchTerm,
      showSearch = false,
      setSearchTerm,
      handleChange,
      menuItems,
      required,
      classes,
      styles,
      errorDetails,
      type = "single",
      endIcon,
    },
    ref
  ) => {
    const [filteredMenuItems, setFilteredMenuItems] = useState<SelectMenuItem[] | MenuItemBase[]>(menuItems);

    // const searchMenuItems = (searchTerm: string) => {
    //   if (type === "single") {
    //     return menuItems
    //       .map((group) => ({
    //         ...group,
    //         menuItems: "menuItems" in group ? group.menuItems.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())) : [],
    //       }))
    //       .filter((group) => ("menuItems" in group ? group.menuItems.length > 0 : false) || group.title.toLowerCase().includes(searchTerm.toLowerCase()));
    //   }
    //   return menuItems.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    // };

    useEffect(() => {
      if (menuItems) {
        setFilteredMenuItems(menuItems);
      }
    }, [menuItems]);

    // useEffect(() => {
    //   if (searchTerm) {
    //     const filteredMenuItems = searchMenuItems(searchTerm);
    //     setFilteredMenuItems(filteredMenuItems);
    //   } else {
    //     setFilteredMenuItems(menuItems);
    //   }
    // }, [searchTerm]);

    const transformMenuItems = useCallback(() => {
      let menuItemsObj: Record<string, SelectMenuItem> = {};

      const transform = (menuItems: SelectMenuItem[], _menuItemsObj?: Record<string, SelectMenuItem>) => {
        menuItemsObj = _menuItemsObj ? { ..._menuItemsObj } : {};

        if (Array.isArray(menuItems) && menuItems.length) {
          for (let i = 0; i < menuItems.length; i++) {
            const item = menuItems[i];

            if (item && !item.isGroup) menuItemsObj[item.value] = item;
            else item?.menuItems && transform(item.menuItems, { ...menuItemsObj });
          }
        }

        return menuItemsObj;
      };

      return transform;
    }, []);

    const handleState = (e: string) => {
      if (type === "single") {
        handleChange([e]);
      } else {
        let newValue = [];

        if (Array.isArray(values) && values.includes(e)) {
          newValue = values.filter((val: string) => val !== e);
        } else if (Array.isArray(values) && !values.includes(e)) {
          newValue = [...values, e];
        } else {
          newValue = [e];
        }

        handleChange(newValue);
      }
    };

    return (
      <div className="flex flex-col">
        {type === "multi" ? (
          <div className="!flex !flex-col">
            {label && (
              <Label className={cn("!pb-[5px]", classes?.label)}>
                {label} {!!required && <sup className="text-red-500">*</sup>}
              </Label>
            )}

            {secondaryLabel && <Label className={`text-[#909090] !font-[300] ${classes?.secondaryLabel}`}>{secondaryLabel}</Label>}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  disabled={disabled}
                  endIcon={endIcon ? endIcon : <ChevronDown className="h-4 w-4 opacity-50" />}
                  className={cn(
                    "justify-between px-3",
                    errorDetails?.message && "border-red-600 text-red-600 focus-visible:!ring-red-600",
                    classes?.selectTriggerContainer
                  )}
                >
                  {placeholder ?? "Select"}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className={cn(
                  classes?.selectContentContainer,
                  "!top-[2px] !min-w-[250px]",
                  "relative z-[10000000] !bg-white max-h-96 overflow-hidden rounded-md border border-solid border-border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                )}
                style={{ ...styles?.selectContentContainer }}
              >
                {showSearch ? (
                  <div className="p-[2px] pb-[5px]">
                    <InputField
                      onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                      // defaultValue={searchTerm}
                      placeholder="Search"
                      endIcon={<Search color="#909090" size={20} />}
                      classes={{ endIcon: "!top-[0.5px] !right-[10x]" }}
                      className="!px-[10px] !font-poppins !text-[14px] !font-[300] !border-border !h-[35px] !border !border-solid !rounded-[6px]"
                    />
                  </div>
                ) : null}

                {filteredMenuItems.map((menuItem) => (
                  <DropdownMenuCheckboxItem
                    key={menuItem.id}
                    checked={values?.some((value) => value === menuItem.value)}
                    onCheckedChange={() => handleState(menuItem.value.toString())}
                    className="focus:bg-accent cursor-pointer rounded-md px-2"
                  >
                    <div>{menuItem.title}</div>

                    {"subTitle" in menuItem && menuItem.subTitle && <div>{menuItem.subTitle}</div>}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {!!errorDetails?.message && <p className="text-sm text-red-600 font-semibold m-0 mt-1 p-0">{errorDetails.message}</p>}
          </div>
        ) : (
          <UnstyledSelect value={values?.[0] ?? ""} onValueChange={handleState}>
            {label && (
              <Label className={cn("!pb-[5px]", classes?.label)}>
                {label} {!!required && <sup className="text-red-500">*</sup>}
              </Label>
            )}

            {secondaryLabel && <Label className={`text-[#909090] !font-[300] ${classes?.secondaryLabel}`}>{secondaryLabel}</Label>}

            <SelectTrigger
              className={cn(
                label && "mt-1",
                errorDetails?.message && "border-red-600 text-red-600 focus-visible:!ring-red-600",
                classes?.selectTriggerContainer
              )}
              style={{ ...styles?.selectTriggerContainer }}
              disabled={disabled}
            >
              <SelectValue className="!text-[#909090]" placeholder={placeholder ?? "Select"}>
                {Array.isArray(values) && values.length ? transformMenuItems()(menuItems)[values[0] as string]?.title : (placeholder ?? "Select")}
              </SelectValue>

              {endIcon ? endIcon : <ChevronDown className="!h-4 !w-4 opacity-50" />}
            </SelectTrigger>

            <SelectContent className={cn("!top-[2px] !min-w-[250px]", classes?.selectContentContainer)} style={{ ...styles?.selectContentContainer }}>
              {showSearch ? (
                <div className="p-[2px] pb-[5px] flex gap-[5px]">
                  <InputField
                    onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                    // defaultValue={searchTerm}
                    placeholder="Search"
                    endIcon={<Search color="#909090" size={20} />}
                    classes={{ endIcon: "!top-[0.5px] !right-[10x]" }}
                    className="!px-[10px] !font-poppins !text-[14px] !font-[300] !border-border !h-[35px] !border !border-solid !rounded-[6px]"
                  />

                  {values?.length ? (
                    <Button className="h-[35px] w-[20px]" size={"free"} onClick={() => handleChange([])}>
                      Clear
                    </Button>
                  ) : null}
                </div>
              ) : null}

              {type === "single" &&
                filteredMenuItems.map((menuItem) =>
                  "isGroup" in menuItem && menuItem.isGroup && menuItem.menuItems ? (
                    <SelectGroup key={menuItem.id}>
                      <SelectLabel className="!text-[12px] !pt-[8px] !pb-[2px]">{menuItem.title}</SelectLabel>

                      {menuItem.menuItems.map((menuItem) => (
                        <SelectItem key={menuItem.id} value={menuItem.value}>
                          <div className="!flex !items-center !gap-[10px]">
                            {menuItem?.icon && menuItem.icon}

                            <div className="font-medium">{menuItem.title}</div>

                            {menuItem.subTitle && <div>{menuItem.subTitle}</div>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ) : (
                    <SelectItem key={menuItem.id} value={menuItem.value}>
                      <div>{menuItem.title}</div>
                      {menuItem.subTitle && <div>{menuItem.subTitle}</div>}
                    </SelectItem>
                  )
                )}
            </SelectContent>

            {!!errorDetails?.message && <p className="text-sm text-red-600 font-semibold m-0 mt-1 p-0">{errorDetails.message}</p>}
          </UnstyledSelect>
        )}

        {values?.length && type === "multi" ? (
          <div className="flex justify-between">
            <Label className="!text-[12px] !font-[300] pt-[5px] pl-[2px]">{values?.length ?? 0} Selected</Label>

            <Label
              className={cn("!text-[12px] !font-[300] pt-[5px] underline cursor-pointer", disabled && "cursor-not-allowed")}
              onClick={() => !disabled && handleChange([])}
            >
              Clear
            </Label>
          </div>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select as React.FC<SelectProps>;
