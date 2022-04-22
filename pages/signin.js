import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function Page() {
  return (
    <Box>
      <Box>
          
        <TextField>الرقم السري</TextField>
      </Box>
      <Box></Box>
      <Box component={Button}></Box>
    </Box>
  );
}
