import { common, red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      light: common.white,
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
    body1: {
      fontWeight: 300,
      fontSize: '2rem',
      '& strong, & b': {
        fontWeight: 700
      }
    }
  }
});

export default theme;
