import React from "react";
import { nanoid } from "nanoid";

import {
  Box,
  Checkbox,
  ClickAwayListener,
  FormHelperText,
  Grow,
  InputLabel,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import useGetPositions from "@medlivery/hooks/useGetPositions";
import MessageBox from "@medlivery/ui/MessageBox";

type MenuItemType = {
  title: string;
};

type DropdownCheckboxProps = {
  id: string;
  label?: string;
  heading?: string;
  value?: string[];
  errors?: string;
  touched?: boolean;
  menuItems: MenuItemType[];
  disabled?: boolean;
  handleChange?: (id: string, value: string[]) => void;
  customHelperText?: string;
  onNoItemsMessage?: string;
  showDropdownIcon?: boolean;
  rootStyles?: React.CSSProperties;
  buttonStyles?: React.CSSProperties;
};

const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({
  id,
  label,
  heading = "Select",
  value = [],
  errors,
  touched,
  menuItems,
  disabled,
  handleChange = null,
  customHelperText,
  onNoItemsMessage = "No items available",
  showDropdownIcon = true,
  rootStyles = {},
  buttonStyles = {},
}) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const handleDropdownToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleDropdownClose = () => setOpen(false);

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const [checked, setChecked] = React.useState<string[]>(value);

  const handleToggle = (itemValue: string) => {
    const currentIndex = checked.indexOf(itemValue);
    const newChecked = [...checked];

    if (currentIndex === -1) newChecked.push(itemValue);
    else newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
    handleChange && handleChange(id, newChecked);
  };

  const { posRef, positions } = useGetPositions();

  let errorBool = errors && touched;

  return (
    <Box sx={{ position: "relative", width: "100%", ...rootStyles }}>
      {label && (
        <InputLabel
          htmlFor={id}
          sx={{
            fontSize: "1.3rem",
            lineHeight: "max-content",
            color: errorBool ? "red" : "black",
            position: "absolute",
            top: 0,
            left: ".9rem",
            padding: "0 .5rem",
            transform: "translateY(-50%)",
            backgroundColor: "white",
          }}
        >
          {label}
        </InputLabel>
      )}

      <Box
        component="button"
        type="button"
        id={id}
        ref={posRef}
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMenuAnchorEl(e.currentTarget);
          handleDropdownToggle();
        }}
        sx={{
          width: "100%",
          height: "5rem",
          borderRadius: "5px",
          bgcolor: "custom.white",
          border: `1px solid ${errorBool ? "red" : "#575757"}`,
          outline: "none",
          fontSize: "1.6rem",
          padding: "0 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: disabled ? "cursor" : "pointer",
          color: value
            ? disabled
              ? "custom.grey_2"
              : "black"
            : errorBool
              ? "red"
              : "custom.grey_2",
          ...buttonStyles,
        }}
      >
        <span
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textAlign: "left",
            textOverflow: "ellipsis",
            pointerEvents: "none",
            width: `${positions?.width ? positions.width - 40 : "auto"}px`,
          }}
        >
          {value.length
            ? value
                .map((el) => (value.length === 1 ? el : el.substring(0, 3)))
                .join(", ")
            : heading}
        </span>

        {showDropdownIcon && !disabled && (
          <KeyboardArrowDownIcon
            sx={{
              color: `${errorBool ? "red" : "custom.grey_2"}`,
              fontSize: "2.5rem",
              pointerEvents: "none",
            }}
          />
        )}
      </Box>

      <Popper
        open={open}
        anchorEl={menuAnchorEl}
        role={undefined}
        placement="bottom-start"
        transition
        style={{ zIndex: 5000 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "center top" }}>
            <Paper>
              <ClickAwayListener onClickAway={handleDropdownClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{
                    width: positions?.width ? positions.width : "100%",
                    maxHeight: "25rem",
                    overflow: "auto",
                  }}
                >
                  {Array.isArray(menuItems) && menuItems.length ? (
                    menuItems.map((el) => (
                      <MenuItem
                        key={nanoid()}
                        sx={{ whiteSpace: "normal", typography: "subtitle1" }}
                        onClick={() => handleToggle(el.title)}
                      >
                        <Checkbox
                          checked={checked.indexOf(el.title) !== -1}
                          tabIndex={-1}
                          disableRipple
                          sx={{ padding: "0 1rem 0 0" }}
                        />
                        {el.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MessageBox
                      message={onNoItemsMessage}
                      rootStyles={{ padding: "0 .5rem" }}
                    />
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <FormHelperText
        sx={{
          typography: "subtitle2",
          padding: ".5rem 0 0 1rem",
          margin: 0,
          color: `${errorBool ? "red" : "black"}`,
        }}
      >
        {errorBool ? errors : customHelperText}
      </FormHelperText>
    </Box>
  );
};

export default React.memo(DropdownCheckbox);
