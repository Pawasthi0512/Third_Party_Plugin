import React, { createContext, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";

import { styled } from "@mui/material/styles";

type SnackBarContextActions = {
  ShowSuccessSnackBar: (text: string) => void;
  ShowApiErrorSnackBar: (err: any) => void;
  ShowErrorSnackBar: (err: any) => void;
  ShowCautionSnackBar: (text: string) => void;
  ShowApiInfoSnackBar: (err: any) => void;
  ShowInfoSnackBar: (text: string) => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
  children: React.ReactNode;
}

function SnackBarProvider({ children }: SnackBarContextProviderProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [typeColor, setTypeColor] = React.useState<
    "info" | "success" | "warning" | "error" | undefined
  >("info");

  /**
   * Shows a snackbar with the given text and color.
   */
  const showSnackBar = (
    text: string,
    colorType: "info" | "success" | "warning" | "error" | undefined
  ) => {
    setMessage(text);
    setTypeColor(colorType);
    setOpen(true);
  };

  /**
   * Handles the closing of the modal.
   */
  const handleClose = () => {
    setOpen(false);
    setTypeColor("info");
  };

  const ShowSuccessSnackBar = (text: string) => {
    showSnackBar(text, "info");
  };

  const ShowErrorSnackBar = (text: string) => {
    showSnackBar(text, "error");
  };

  const ShowInfoSnackBar = (text: string) => {
    showSnackBar(text, "info");
  };

  const ShowCautionSnackBar = (text: string) => {
    showSnackBar(text, "warning");
  };

  const ShowApiErrorSnackBar = (err: any) => {
    if (err?.response) {
      if (err.response.status !== 502 && err.response.status !== 500) {
        ShowErrorSnackBar(err.response.data?.message);
      } else ShowErrorSnackBar("Something went wrong!");
    }
  };

  const ShowApiInfoSnackBar = (err: any) => {
    if (err?.response) {
      if (err.response.status !== 502 && err.response.status !== 500) {
        ShowInfoSnackBar(err.response.data?.message);
      } else ShowInfoSnackBar("Something went wrong!");
    }
  };

  const CustomAlert = styled(Alert)(({ theme, severity }) => ({
    minWidth: "380px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    overflow:'hidden',
    whiteSpace: 'normal',
    maxWidth: "auto",
    backgroundColor:
      severity === "error"
        ? "#D8564B"
        : severity === "success"
        ? "#333333"
        : severity === "warning"
        ? theme.palette.error.main
        : severity === "info"
        ? "#333333"
        : "",
    color: theme.palette.primary.contrastText,
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "16px",
    ".MuiSvgIcon-root": {
      color: theme.palette.primary.contrastText,
    },
  }));

  const value = React.useMemo(
    () => ({
      ShowSuccessSnackBar,
      ShowApiErrorSnackBar,
      ShowErrorSnackBar,
      ShowCautionSnackBar,
      ShowApiInfoSnackBar,
      ShowInfoSnackBar,
    }),
    []
  );
  return (
    <SnackBarContext.Provider value={value}>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={9000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleClose}
        >
          <CustomAlert onClose={handleClose} severity={typeColor}>
            {message}
          </CustomAlert>
        </Snackbar>
      )}

      {children}
    </SnackBarContext.Provider>
  );
}

const useSnackBar = (): SnackBarContextActions => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error("useSnackBar must be used within an SnackBarProvider");
  }

  return context;
};

export { SnackBarProvider, useSnackBar };
