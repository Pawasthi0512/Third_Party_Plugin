import {  styled } from "@mui/material";
import React from "react";
import Select, { components } from "react-select";
import { SearchIcon } from "../../Assets/Icons/SearchIcon";
import { theme } from "../../Utiles/theme";

const BoxContainer = styled('span')(({ theme }) => ({
  padding: theme.spacing(0),
  borderRadius: "8px",
  color: theme.palette.secondary.main,
  ".MuiPaper-elevation1": {
    boxShadow: "none",
    maxHeight: "35px",
  },
  ".MuiInput-input": {
    fontSize: theme.spacing(6),
  },
  ".MuiSvgIcon-root": {
    fontSize: theme.spacing(9),
  },
  ".css-1jqq78o-placeholder": {
    fontSize: theme.spacing(6),
    color: theme.palette.secondary.main,
    ".css-1nmdq5-menu": {
      fontSize: theme.spacing(6),
    },
  },
  ".css-qbdosj-Input": {
    color: theme.palette.secondary.main,
    fontWeight: "400",
    fontSize: "12px",
  },
  ".css-13cymwt-control": {
    border: `1px solid ${theme.misc.inputBorder}`,
    borderRadius: "4px 0px 0px 4px",
    ...theme.typography.h5,
    height:'32px'
  },

  ".css-1xc3v61-indicatorContainer": {
    color: " #1C1B1F",
    width:'16px',
    height:'16px',
  },
  ".css-1u9des2-indicatorSeparator": {
    display: "none",
  },
}));

const customStyles = {
  maxHeight: "32px",
  menu: (base) => ({
    ...base,
    border: "1px solid",
    borderColor: theme.misc.borderGrey,
    background: "white",
    padding:'0px 10px',
    zIndex: 9999,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  control: (base, state) => ({
    ...base,
    border: state.isDisabled ? "none" : undefined,
    cursor: state.isDisabled ? "not-allowed" : "default",
    pointerEvents: "auto",
    minHeight: '32px',
    height: '32px',
    "&:focus": {
      borderColor: state.isFocused
        ? theme.misc.borderGrey
        : theme.palette.primary.main,
    },
    "&:hover": {
      borderColor: state.isFocused
        ? theme.misc.borderGrey
        : theme.palette.primary.main,
    },
    "&:disabled": {
      border: "none",
    },
  }),
  menuList: (base) => ({
    ...base,
    ...theme.typography.h5,
    color: theme.palette.primary.main,
    textAlign: "start",
  }),
  singleValue: (base) => ({
    ...base,
    ...theme.typography.h5,
    color: theme.palette.primary.main,
  }),
  indicatorContainer: () => ({
    width:'16px',
    height:'16px',
    color:'#1C1B1F'
  })
};

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIcon />
    </components.DropdownIndicator>
  );
};

const CustomSearch = ({ placeholder  ,onChange , options}) => {
  return (
    <BoxContainer>
      <Select
        closeMenuOnSelect={false}
        options={options}
        isMulti
        components={{ Placeholder, DropdownIndicator }}
        placeholder={placeholder}
        styles={customStyles}
        onChange={onChange}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#F5F5F5",
            primary: "#7D69FF",
          },
        })}
      />
    </BoxContainer>
  );
};
export default CustomSearch;
