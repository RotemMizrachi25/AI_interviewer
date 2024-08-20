import { createTheme } from '@mui/material/styles';
import i18n from "i18next";

//global definitions for mui fonts
const theme = createTheme({
    typography: {
        fontFamily: i18n.language === 'he' ? 'Varela Round, ariel' : 'Nunito, sans-serif',
        h3: {
            fontWeight: 900,
        },
        body1: {
            fontWeight: 400,
        },
    }

});

export default theme;
