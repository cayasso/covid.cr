import { createMuiTheme } from '@material-ui/core/styles'
import { red, grey, pink, deepPurple } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: '900',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '600',
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: '900',
      marginTop: '1rem',
    },
    h4: {
      fontSize: '1.6rem',
      fontWeight: '900',
      marginTop: '1rem',
      marginBottom: '1.6rem',
    },
    h5: {
      fontSize: '1.4rem',
      fontWeight: '600',
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: '600',
    },
    button: {
      textTransform: 'none',
      fontWeight: '500',
    },
    body1: {
      fontSize: '1.1rem',
    },
    body2: {
      fontWeight: '500',
    },
  },
  palette: {
    primary: {
      main: deepPurple[900],
    },
    secondary: {
      main: pink[700],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        // border: '1px solid red'
      },
    },
    MuiButton: {
      containedSizeLarge: {
        paddingTop: 14,
        paddingBottom: 14,
        fontSize: '1.2rem',
      },
      sizeSmall: {
        fontSize: '1.1rem',
      },
      label: {
        fontSize: '1.2rem',
      },
      root: {
        borderRadius: 8,
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: grey[800],
      },
    },
    MuiSelect: {
      icon: {
        color: grey[900],
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '1.2rem',
        backgroundColor: '#FFF',
      },
    },
    MuiInputLabel: {
      root: {
        color: grey[900],
        fontWeight: '600',
        fontSize: '1.2rem',
      },
    },
    MuiTypography: {
      gutterBottom: {
        // marginBottom: '2rem'
      },
    },
    MuiSnackbarContent: {
      root: {
        fontSize: '1.2rem !important',
      },
    },
  },
})

export default theme
