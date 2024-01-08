import { Box, ImageList, ImageListItem, styled } from "@mui/material";
import React from "react";
import { helpers } from "../../Utiles/hooks";
// import LogoDrawer from "../LogoDrawer";
import csInterface from "../../CSInterface.js"

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  ".MuiImageListItem-root": {
    maxWidth: "130px",
    margin: "0px",
  },
  ".image-container": {
    width: "124px",
    height: "124px",
    border: "1px solid #DFDFDF",
    borderRadius: "4px",
    padding: "3px",
    display: "flex",
    alignItems: "center",
    justifycontent: "center",
    cursor:'pointer'
  },
}));
const CustomLogo = ({ itemData }) => {
  // const [openFileDrawer, setOpenFileDrawer] = React.useState(false);
  // const [logoDetails , setLogoDetails] = React.useState({})

  // function handleOpenFile(item) {

  //   setOpenFileDrawer(!openFileDrawer);
  //   setLogoDetails(item)
  // }

  // function handleCloseFile() {
  //   setOpenFileDrawer(false)
  // }

  const listCreateArray = itemData.map((_updatedSection) => {
    return _updatedSection.updatedSectionID;
  });

  const handleLogoClick = (item) => {
    // console.log("logo item" ,item)
    // helpers.handleDownloadAssetFile(item?.id , item?.fileVersions?.id )
    const url = helpers.handlePreviewLogo({
      sectionId: item.sectionId,
      logoId: item.logoId,
    })
    fetch(url).then((res) => csInterface.evalScript(`fillImage('${res.url}' , '${item?.title}')`))
  }
 

  return (
    <BoxContainer>
      <ImageList
        sx={{ width: 420, padding: "5px", margin: "0px" }}
        cols={3}
        rowHeight={135}
      >
        {listCreateArray.flat().map((item) => {
          return (
            <ImageListItem key={item.id} >
              <Box className="image-container" onClick = {() => handleLogoClick(item)}>
                <img
                  height="124px"
                  width="120px"
                  src={
                    helpers.showDefaultImage(item.title) ||
                    helpers.handlePreviewLogo({
                      sectionId: item.sectionId,
                      logoId: item.logoId,
                    })
                  }
                  alt={item.title}
                  loading="lazy"
                  // onClick={() => handleOpenFile(item)}
                />
              </Box>
            </ImageListItem>
          );
        })}

      </ImageList>
      {/* <LogoDrawer 
        openFileDrawer={openFileDrawer}
        handleCloseFile={handleCloseFile}
        item={logoDetails}
      /> */}
    </BoxContainer>
  );
};
export default CustomLogo;
