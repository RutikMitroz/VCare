import { Box, Button } from "@mui/material";
// import { InputField } from "@medlivery/vulkan-ui";
import AddIcon from '@mui/icons-material/Add';
import Input from "../utilities/InputField";

const RenderEnquiry = () => {
  return (

    <Box >
      <Box></Box>
      <Box>
        <Box
          sx={{
            margin: ".5rem 0 1rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4.5rem",
          }}
        >
          <div className="w-[25rem]">
            <Input
              placeholder="Search tests..."
              // value={query}
              // endIcon={searchParams.get("q") ? <X /> : null}
              // onEndIconClick={() => handleSearch("")}
              // onChange={(e) => {
              //   setQuery(e.target.value);
              //   debouncedSearch(e.target.value);
              // }}
            />
          </div>
          <Button size='small' variant="contained" sx={{ textTransform: "capitalize", textAlign: "center" }}> <AddIcon />  Add Enquiry </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default RenderEnquiry;