import { useTranslation } from 'react-i18next';
import {Button} from "@mui/material";
import { useLanguage } from './LanguageContext';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const { changeLanguage } = useLanguage();

    const toggleLanguage = ({onLanguageChange}) => {
        const newLanguage = i18n.language === 'en' ? 'he' : 'en';
        i18n.changeLanguage(newLanguage);
        changeLanguage(newLanguage);
    };

    return (
        <Button
            onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'עברית' : 'English'}
        </Button>
    );
}

export default LanguageSwitcher;
