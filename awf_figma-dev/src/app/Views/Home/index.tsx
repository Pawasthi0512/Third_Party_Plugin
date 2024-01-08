import { Box, Divider, styled } from "@mui/material";
import React from "react";
import TopbarTop from "../../Components/TopbarTob";

const HomeContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  overflowX:'hidden',
  ".homeContainerTop": {
    padding: "8px",
    display: "flex",
    alignItems: "center",
  },
  ".artWorkFlow": {
    fontWeight: "500",
    fontSize: "12px",
    color: theme.palette.primary.main,
    paddingLeft: "8px",
  },
}));

const Home = ({handleLogout}) => {
  

  return (
    <HomeContainer>
      <Divider />
      <TopbarTop handleLogout={handleLogout} />
    </HomeContainer>
  );
};
export default Home;
