import { createTheme } from '@mui/material/styles';

// Define the theme options
const Theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(15,48,93)'
        },
        secondary: {
            main: 'rgb(38,92,152)'
        },
        background: {
            default: 'white'
        },
        customBackground: {
            default: 'rgb(60,134,206)'
        },
        hoverBackground: {
            main: 'rgb(124,186,223)'
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
