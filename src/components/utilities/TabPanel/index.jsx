import Box from "@mui/material/Box";

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    sx: { textTransform: "none", padding: "1rem", minHeight: "max-content" },
  };
};

function TabPanel(props) {
  const { children, value, index, rootStyles = {}, contentStyles = {}, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ width: "100%", ...rootStyles }}
      {...other}
    >
      {value === index && <Box sx={{ py: 2.5, ...contentStyles }}>{children}</Box>}
    </Box>
  );
}

export default TabPanel;
