import * as React from 'react';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { lngs } from '../../common/i18n';
import { useTranslation } from 'react-i18next';

const LanguageMenu: React.FC = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (lng: string) => {
        i18n.changeLanguage(lng);
        handleClose();
    };

    const sortedLanguages = Object.keys(lngs).sort((a, b) =>
        lngs[a].nativeName.localeCompare(lngs[b].nativeName)
    );

    return (
        <div>
            <Button
                id="language-button"
                aria-controls={open ? 'language-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <span className={`fi fi-${lngs[i18n.language].countryCode}`} />
            </Button>
            <Menu
                id="language-menu"
                MenuListProps={{
                    'aria-labelledby': 'language-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {sortedLanguages.map(lng => (
                    <MenuItem key={lng} onClick={() => handleLanguageChange(lng)}>
                        <span className={`mr-1 fi fi-${lngs[lng].countryCode}`} />{' '}
                        {lngs[lng].nativeName}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default LanguageMenu;
