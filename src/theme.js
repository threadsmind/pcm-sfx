import { common, red } from '@material-ui/core/colors';
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: common.black
    },
    error: {
      main: red.A400
    },
    background: {
      default: common.black
    }
  },
  typography: {
    fontFamily: '"Teko", "Verdana", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '3rem',
      textTransform: 'uppercase'
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
      textTransform: 'uppercase'
    },
    body1: {
      fontWeight: 300,
      fontSize: '1.5rem',
      '& strong, & b': {
        fontWeight: 700
      }
    }
  }
});

export default theme;
