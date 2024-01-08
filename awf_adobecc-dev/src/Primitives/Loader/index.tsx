import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box
      display="flex"
      justifyItems="center"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top='50%'
      right="50%"
    >
      <CircularProgress />
    </Box>
  );
}
