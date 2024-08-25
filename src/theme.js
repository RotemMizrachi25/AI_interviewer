import { createTheme } from '@mui/material/styles';
import i18n from "i18next";

//global definitions for mui fonts
const theme = createTheme({
    typography: {
        fontFamily: i18n.language === 'he' ? 'Varela Round, Tahoma, ariel' : 'Nunito, sans-serif',
        h3: {
            fontWeight: 900,
        },
        body1: {
            fontWeight: 400,
        },
        direction: i18n.language === 'he' ? 'rtl' : 'ltr',
    }

});

export default theme;
