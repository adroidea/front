import './header.component.scss';
import LanguageMenu from '../language-menu/language-menu.component';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const { t } = useTranslation();

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">{t('navigation.home')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">{t('navigation.modules')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/faq">{t('navigation.support')}</NavLink>
                    </li>
                </ul>
                <LanguageMenu />
            </nav>
        </header>
    );
};

export default Header;
