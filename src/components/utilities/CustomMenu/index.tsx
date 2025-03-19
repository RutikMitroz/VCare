import * as React from "react";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";

import { IconButton, SxProps } from "@mui/material";
import { Box } from "@mui/system";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import MenuIcon from "@mui/icons-material/Menu";

interface MenuOptionProps {
  image?: string;
  name: string;
}

const MenuOption: React.FC<MenuOptionProps> = ({ image, name }) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    {image ? (
      <img
        src={image}
        alt={name}
        style={{ width: "2rem", height: "2rem", marginRight: "1.5rem" }}
      />
    ) : null}
    <Box>{name}</Box>
  </Box>
);

interface MenuItemProps {
  iconImage?: string;
  itemName: string;
  pathname?: string;
  extURL?: string;
  isVisible?: boolean;
  fn?: () => void;
}

interface CustomMenuProps {
  CustomIcon?: React.ReactNode;
  CustomIconImage?: string;
  iconImageAlt?: string;
  items: MenuItemProps[];
  position?: PopperPlacementType;
  transformOrigin?: string;
  menuStyles?: SxProps;
}

const CustomMenu: React.FC<CustomMenuProps> = ({
  CustomIcon,
  CustomIconImage,
  iconImageAlt,
  items,
  position,
  transformOrigin,
  menuStyles = {},
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{
          overflow: "hidden",
          height: "6rem",
          width: "6rem",
          padding: 0,
          border: "1px solid #dcdcdc",
          bgcolor: "custom.white",

          "&:hover": { bgcolor: "custom.white" },

          ...menuStyles,
        }}
      >
        {CustomIconImage ? (
          <img
            src={CustomIconImage}
            alt={iconImageAlt}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        ) : CustomIcon ? (
          CustomIcon
        ) : (
          <MenuIcon sx={{ fontSize: "4rem" }} />
        )}
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement={position ?? "bottom-end"}
        transition
        style={{ zIndex: 400 }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: transformOrigin ?? "right top" }}
          >
            <Paper sx={{ boxShadow: "none" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{
                    width: "max-content",
                    minWidth: "20rem",
                    border: "1px solid #dcdcdc",
                    borderRadius: ".5rem",
                  }}
                >
                  {items.map(
                    (item) =>
                      (item?.isVisible ?? true) && (
                        <MenuItem
                          key={nanoid()}
                          sx={{ padding: 0, minHeight: 0 }}
                          onClick={(e) => {
                            item.fn && item.fn();
                            handleClose(
                              e as unknown as MouseEvent | TouchEvent
                            );
                          }}
                        >
                          <>
                            {item.pathname && (
                              <NavLink
                                to={item.pathname}
                                style={{ ...linkStyles }}
                              >
                                <MenuOption
                                  image={item.iconImage}
                                  name={item.itemName}
                                />
                              </NavLink>
                            )}

                            {item.extURL && (
                              <Box
                                component="a"
                                sx={{ ...linkStyles }}
                                href={item.extURL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MenuOption
                                  image={item.iconImage}
                                  name={item.itemName}
                                />
                              </Box>
                            )}

                            {!item.pathname && !item.extURL ? (
                              <Box sx={{ ...linkStyles }}>
                                <MenuOption
                                  image={item.iconImage}
                                  name={item.itemName}
                                />
                              </Box>
                            ) : null}
                          </>
                        </MenuItem>
                      )
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default CustomMenu;

const linkStyles: React.CSSProperties = {
  minWidth: "13rem",
  width: "100%",
  display: "block",
  textDecoration: "none",
  color: "black",
  padding: ".5rem 1rem",
  fontSize: "1.4rem",
  lineHeight: "1.5rem",
  textAlign: "left",
};
