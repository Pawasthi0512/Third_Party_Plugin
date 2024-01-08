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
      width="100%"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
}
