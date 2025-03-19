import { nanoid } from "nanoid";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

interface MenuItemProps {
  title: string;
  value?: any;
  iconImage?: string;
  isActive?: boolean;
  disabled?: boolean;
  fn?: (item: MenuItemProps) => void;
}

interface CustomMenuListProps {
  menuItems: MenuItemProps[];
  open: boolean;
  menuAnchorEl: HTMLElement | null;
  setMenuAnchorEl: (anchorEl: HTMLElement | null) => void;
  setOpenMenu: (open: boolean) => void;
}

const CustomMenuList: React.FC<CustomMenuListProps> = ({
  menuItems,
  open,
  menuAnchorEl,
  setMenuAnchorEl,
  setOpenMenu,
}) => {
  return open ? (
    <Menu
      id="basic-menu"
      anchorEl={menuAnchorEl}
      open={Boolean(menuAnchorEl)}
      onClose={() => setOpenMenu(false)}
    >
      {menuItems
        .filter((el) => el.isActive !== false) // Filter out inactive items
        .map((el) => (
          <MenuItem
            key={nanoid()}
            sx={{
              typography: "subtitle2",
              gap: "1rem",
              padding: ".5rem 1rem",
              lineHeight: "1.5rem",
              minHeight: 0,
            }}
            disabled={el.disabled}
            onClick={() => {
              if (el.fn) {
                el.fn(el);
              }
              setOpenMenu(false);
              setMenuAnchorEl(null); // Set anchor element to null to close the menu
            }}
          >
            {el.iconImage ? (
              <Box
                component="img"
                src={el.iconImage}
                alt={el.title}
                sx={{ height: "1.5rem", width: "1.5rem", objectFit: "contain" }}
              />
            ) : null}
            {el.title}
          </MenuItem>
        ))}
    </Menu>
  ) : null;
};

export default CustomMenuList;
