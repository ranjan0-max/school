import { createTheme } from '@mui/material/styles';

// Define the theme options
const Theme = createTheme({
    palette: {
        primary: {
            main: '#189ab4'
        },
        secondary: {
            main: '#75e6da'
        },
        background: {
            default: 'white'
        },
        customBackground: {
            default: '#189ab4'
        },
        hoverBackground: {
            main: '#d4f1f4'
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        button: {
            textTransform: 'none' // Disable uppercase transformation for buttons
        }
    }
});

export default Theme;
