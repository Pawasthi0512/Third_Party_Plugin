import { Box, styled, Typography } from "@mui/material"
import React from "react"

const BoxContainer = styled(Box)(({theme}) => ({
    padding:theme.spacing(0),
    position:'fixed',
    top:'50%',
    left:'25%'
}))
const EmptyContainer = () => {
    return(
        <BoxContainer>
            <Typography>No palettes added yet!</Typography>
        </BoxContainer>
    )
}
export default EmptyContainer