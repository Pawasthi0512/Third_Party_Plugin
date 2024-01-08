import { Box, Divider, styled, Typography } from "@mui/material";
import React from "react";
import ArtSmallLogo from "../../Assets/Icons/ArtSmallLogo";
import TopbarTop from "../../Components/TopbarTob";
import LocalStorageService from "../../Utiles/localStroage";
import { useSnackBar, useAuth } from "../../Utiles/hooks";

// const TopbarTop = lazy(() => import("../../Components/TopbarTob"))

const HomeContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
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

const Home = () => {
  const { ShowSuccessSnackBar} = useSnackBar()
  const {setUser} = useAuth()
  const handleLogout = () => {
    LocalStorageService.clearToken();
    ShowSuccessSnackBar('Logout successful')
    setUser(false)
  };

  return (
    <HomeContainer>
      <Box className="homeContainerTop">
        <ArtSmallLogo />
        <Typography className="artWorkFlow">ArtworkFlow</Typography>
      </Box>
      <Divider />
      <TopbarTop handleLogout={handleLogout} />
    </HomeContainer>
  );
};
export default Home;
