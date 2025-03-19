import React from "react";
import { nanoid } from "nanoid";

import {
  Box,
  ClickAwayListener,
  FormHelperText,
  Grow,
  InputLabel,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  SxProps,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import useGetPositions from "@medlivery/hooks/useGetPositions";
import truncateString from "@medlivery/utils/truncateString";

interface MenuItemType {
  id: string;
  title: string;
  value?: string;
  index?: number;
}

interface CustomDropdownProps {
  id: string;
  label?: string;
  heading?: string;
  value?: string;
  actualValue?: string;
  errors?: string;
  touched?: boolean;
  menuItems?: MenuItemType[];
  disabled?: boolean;
  truncateStringOn?: number;
  handleChange?: (id: string, item: MenuItemType) => void;
  customHelperText?: string;
  msgWhenMenuItemsNotPresent?: string;
  showDropdownIcon?: boolean;
  rootStyles?: SxProps;
  buttonStyles?: SxProps;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  label,
  heading = "Select",
  value,
  actualValue,
  errors,
  touched,
  menuItems,
  disabled = false,
  truncateStringOn,
  handleChange = null,
  customHelperText,
  msgWhenMenuItemsNotPresent = "",
  showDropdownIcon = true,
  rootStyles = {},
  buttonStyles = {},
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = () => setOpen(false);

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const { posRef, positions } = useGetPositions();

  const errorBool = !!(errors && touched);

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
          handleToggle();
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
          cursor: disabled ? "not-allowed" : "pointer",
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
        <Box
          component="span"
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {truncateStringOn
            ? truncateString(value || heading, truncateStringOn)
            : value || heading}
        </Box>

        {showDropdownIcon && !disabled && menuItems && menuItems.length ? (
          <KeyboardArrowDownIcon
            sx={{
              color: `${errorBool ? "red" : "custom.grey_2"}`,
              fontSize: "2.5rem",
              pointerEvents: "none",
            }}
          />
        ) : null}
      </Box>

      {menuItems && menuItems.length ? (
        <Popper
          open={open}
          anchorEl={menuAnchorEl}
          role={undefined}
          placement="bottom-start"
          transition
          style={{ zIndex: 5000 }}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: "center top" }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    sx={{
                      width: positions?.width || "100%",
                      maxHeight: "25rem",
                      overflow: "auto",
                    }}
                  >
                    {menuItems.map((el) => (
                      <MenuItem
                        key={nanoid()}
                        sx={{
                          whiteSpace: "normal",
                          typography: "subtitle1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "1rem",
                          paddingTop: "2px",
                          paddingBottom: "2px",
                        }}
                        onClick={() => {
                          handleChange && handleChange(id, el);
                          handleClose();
                        }}
                      >
                        {el.title}
                        {(actualValue
                          ? el.id === actualValue
                          : el.title === value) && (
                          <CheckCircleIcon
                            color="primary"
                            sx={{ fontSize: "2rem" }}
                          />
                        )}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      ) : null}

      {(errorBool || customHelperText || msgWhenMenuItemsNotPresent) && (
        <FormHelperText
          sx={{
            typography: "subtitle2",
            padding: ".5rem 0 0 1rem",
            margin: 0,
            color: `${errorBool ? "red" : "black"}`,
          }}
        >
          {errorBool
            ? errors
            : menuItems && menuItems.length === 0 && msgWhenMenuItemsNotPresent
              ? msgWhenMenuItemsNotPresent
              : customHelperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default React.memo(CustomDropdown);
