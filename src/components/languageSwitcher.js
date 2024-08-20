import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";
import {Button, Tab} from "@mui/material";

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'he' : 'en';
        i18n.changeLanguage(newLanguage);
    };

    return (
        <Button
            onClick={changeLanguage}>
            {i18n.language === 'en' ? 'עברית' : 'English'}
        </Button>
    );
}

export default LanguageSwitcher;
