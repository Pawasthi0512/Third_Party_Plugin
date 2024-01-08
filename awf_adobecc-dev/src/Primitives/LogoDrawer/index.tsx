import {
    Box,
    Button,
    // Divider,
    Drawer,
    styled,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { helpers} from "../../Utiles/hooks";
  import csInterface from "../../CSInterface.js"
// import { CloseIcon } from "../../Assets/Icons/CloseIcon";
  // import FileUploadIcon from "../../Assets/FileUploadIcon";
  
  const DrawerContainer = styled(Drawer)(({ theme }) => ({
    padding: theme.spacing(0),
   
  
    ".MuiDrawer-root": {
      borderRadius: "40px",
    },

    ".title-logoFile": {
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "16px",
      width: "396px",
      textAlignement: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.primary.main,
    },
    ".close-logoFileIcon": {
      fontWeight: "400",
      fontSize: "16px",
      cursor: "pointer",
    },
    ".middle-logoFilecontaier": {
      padding: "8px",
      display: "flex",
      alignItems: "center",
    },
    ".file-logoImage": {
      borderRadius: "4px",
    },
    ".Conatiner-logo": {
      padding: "8px",
    },
    ".file-logoWrapperTitle": {
      marginLeft:'8px',
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "16px",
      paddingRight: "16px",
      color: theme.palette.primary.main,
    },
    ".bottom-logoFilecontaier": {
      padding: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    ".contained-logo": {
      padding: "3px 0px",
      textTransform: "none",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
      boxShadow: "none",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: theme.palette.primary.main,
      color: theme.palette.info.main,
      minWidth: "56px",
    },
    ".logo-logoDrawerWrapper":{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
    },
    ".logo-logoDrawerTopWrapper":{
        padding:'10px',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
    },
    ".file-logoTitle": {
        marginLeft:'8px',
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "16px",
        paddingRight: "16px",
        color: theme.palette.primary.main,
      },
  }));
  
  const LogoDrawer = ({ openFileDrawer, handleCloseFile , item  }) => {
  
  
    const  handleImport = (item) => {
        const logoUrl =   helpers.handlePreviewLogo({
            sectionId: item.sectionId,
            logoId: item.logoId,
          })
          console.log(logoUrl)
          csInterface.openURLInDefaultBrowser(logoUrl) 
    }
  
    const handleFetch = (item) => {
        // console.log(item?.title)
        csInterface.evalScript(`fillImage('${item.title}')`)
    }
  
    return (
      <DrawerContainer
        sx={{ borderRadius: "6px" }}
        anchor={"bottom"}
        open={openFileDrawer}
        onClose={handleCloseFile}
      >
        {/* <Box className='logoDrawerTopWrapper'>
            <Typography className="fileTitle">Logo</Typography>
            <Box sx={{cursor:'pointer'}}>
                <CloseIcon onClick={handleCloseFile}/>
            </Box>
        </Box>
        <Divider/> */}
        <Box className='logo-logoDrawerWrapper'>
            <Box className="middle-logoFilecontaier">
              <Box>
                <img
                  className="file-logoImage"
                  width={40}
                  height={40}
                  src={
                    helpers.showDefaultImage(item.title) ||
                    helpers.handlePreviewLogo({
                      sectionId: item.sectionId,
                      logoId: item.logoId,
                    })
                  }
                  alt={item.title}
                />
              </Box>
              <Box>
                <Typography className="file-logoWrapperTitle">{item?.title}</Typography>
              </Box>
            </Box>
            <Box className="bottom-logoFilecontaier">
              <Button
                className="contained-logo"
                variant="contained"
                // disabled = {isFileAvailable ? true : false}
                onClick={() => {
                  handleImport(item)
                }
                }
              >
                Import
              </Button>
              <Button
                sx={{marginLeft : '4px'}}
                className="contained-logo"
                variant="contained"
                onClick={() => {
                  handleFetch(item)
                }
                }
              >
                Apply
              </Button>
            </Box>
        </Box>
      </DrawerContainer>
    );
  };
  export default LogoDrawer;
  