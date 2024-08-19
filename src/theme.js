import { createTheme } from '@mui/material/styles';

//global definitions for mui fonts
const theme = createTheme({
    typography: {
        fontFamily: 'Nunito, sans-serif',
        h3: {
            fontWeight: 900,  // Nunito Black 900 for h1
        },
        body1: {
            fontWeight: 400,  // Default Nunito weight for body text
        },
    },
});

export default theme;
