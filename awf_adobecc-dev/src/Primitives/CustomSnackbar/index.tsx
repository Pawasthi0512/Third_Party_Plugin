import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, styled } from '@mui/material';

const BoxContainer = styled(Box)(({theme}) => ({
  padding:theme.spacing(0),
  width:'420px',
  '.MuiSankbarContent-root':{
    fontSize:'12px'
  },
  '.snackbar':{
    fontSize:'12px',
    background:theme.palette.primary.main,
    color:theme.palette.secondary.contrastText
  },
  '.MuiAlert-icon':{
    fontSize:'14px',
    color:theme.palette.secondary.contrastText,
    display:'flex',
    alignItems:'center'
  },
  '.MuiAlert-message':{
    color:theme.palette.primary.contrastText,
  }
}))
export default function CustomSnackbar({snackbarMsg}) {
  const [open, setOpen] = React.useState(true);
  const [retry ] = React.useState(false);

  /**
   * Handle close snackbar
   */
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    console.log(event)
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      {retry === true ? 
      <Button color="secondary" size="small" onClick={handleClose}>
        Retry
      </Button>
      :
      ""
      }
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        sx={{fontSize:'14px'}}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <BoxContainer>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{fontSize:'12px'}}
      >
        <Alert severity="info" action={action}  className="snackbar">{snackbarMsg}</Alert>
      </Snackbar>
    </BoxContainer>
  );
}