import React from 'react';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#EF4F84' },
    secondary: { main: '#344955' },
    background: {
      default: '#EDF0F3',
    },
  },
  overrides: {
    MuiTypography: {
      h3: {
        marginTop: '2rem',
        marginBottom: '1.5rem',
        fontSize: '1rem',
        fontStyle: 'italic',
      },
    },
    MuiInputLabel: {
      shrink: {
        transform: 'translate(14px, -15px) scale(0.75)!important',
      },
    },
    MuiPopover: {
      paper: {
        borderRadius: '10px',
        background: '#edf0f3',
        boxShadow: '14px 18px 25px #bec0c2, -4px -8px 25px #ffffff',
      },
    },
    MuiSelect: {
      selectMenu: {
        borderRadius: '10px',
        minWidth: '50px',
        '&:focus': {
          borderRadius: '10px',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '& fieldset': {
          border: 'none',
        },
      },
      multiline: {
        padding: '0',
        '& textarea': {
          padding: '18.5px 14px',
        },
      },
      input: {
        borderRadius: '10px',
        background: '#EDF0F3',
        color: '#3b3f44',
        fontWeight: 500,
        letterSpacing: '.5px',
        boxShadow: 'inset -1px 1px 5px #bec0c2, inset 6px -6px 19px #ffffff',
        '&:invalid': {
          background: '#EDF0F3',
          boxShadow: 'inset -1px 1px 5px #bec0c2, inset 6px -6px 19px #ffffff',
        },
        '&:active,&:focus': {
          background: '#EDF0F3',
          boxShadow: 'inset -6px 6px 5px #bec0c2, inset 6px -6px 19px #ffffff',
        },
      },
    },
    MuiButton: {
      containedPrimary: {
        color: '#fff',
        borderRadius: '35px',
        backgroundColor: '#EF4F84',
        boxShadow:
          '-7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, inset 0px 0px 0px 0px #fff9, inset 0px 0px 0px 0px #0001, inset 0px 0px 0px 0px #fff9, inset 0px 0px 0px 0px #0001',

        '&:hover': {
          backgroundColor: '#e42a68',
          boxShadow:
            '-7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, inset 0px 0px 0px 0px #fff9, inset 0px 0px 0px 0px #0001, inset 0px 0px 0px 0px #fff9, inset 0px 0px 0px 0px #0001',
        },
        '&:focus:active': {
          background: '#e42a68',
          boxShadow:
            '0px 0px 0px 0px #fff9, 0px 0px 0px 0px #fff9, 0px 0px 0px 0px #0001, 0px 0px 0px 0px #0001, inset -7px -7px 20px 0px #e42a68, inset -4px -4px 5px 0px #fff9, inset 7px 7px 9px 0px rgba(0, 0, 0, 0.5), inset 4px 4px 5px 0px #0001',
        },
        '&:focus-only': {
          background: '#e42a68',
          boxShadow:
            '0px 0px 0px 0px #fff9, 0px 0px 0px 0px #fff9, 0px 0px 0px 0px #0001, 0px 0px 0px 0px #0001, inset -7px -7px 20px 0px #e42a68, inset -4px -4px 5px 0px #fff9, inset 7px 7px 9px 0px rgba(0, 0, 0, 0.5), inset 4px 4px 5px 0px #0001',
        },
      },
      containedSecondary: {
        color: '#000',
        borderRadius: '35px',
        backgroundColor: '#EDF0F3',
        boxShadow:
          '-7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, inset 0px 0px 0px 0px #fff9, inset 0px 0px 0px 0px #0001, inset 0px 0px 0px 0px #fff9, inset 0px 0px 0px 0px #0001',

        '&:hover': {
          backgroundColor: '#e4e4e4',
          boxShadow:
            '-7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, inset 0px 0px 0px 0px #fff9, inset 0px 0px 0px 0px #0001, inset 0px 0px 0px 0px #fff9, inset 0px 0px 0px 0px #0001',
        },
        '&:focus:active': {
          background: '#e0e4e8',
          boxShadow:
            '0px 0px 0px 0px #fff9, 0px 0px 0px 0px #fff9, 0px 0px 0px 0px #0001, 0px 0px 0px 0px #0001, inset -7px -7px 20px 0px #fff9, inset -4px -4px 5px 0px #fff9, inset 7px 7px 20px 0px #0003, inset 4px 4px 5px 0px #0001',
        },
        '&:focus-only': {
          background: '#e0e4e8',
          boxShadow:
            '0px 0px 0px 0px #fff9, 0px 0px 0px 0px #fff9, 0px 0px 0px 0px #0001, 0px 0px 0px 0px #0001, inset -7px -7px 20px 0px #fff9, inset -4px -4px 5px 0px #fff9, inset 7px 7px 20px 0px #0003, inset 4px 4px 5px 0px #0001',
        },
      },
    },
  },
});

function App() {
  document.body.classList.remove('loading');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
