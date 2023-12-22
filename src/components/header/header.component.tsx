import './header.component.scss';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { DrawerNavigation } from './drawer-navigation/drawer-navigation.component';
import { Icon } from '@mui/material';
import LanguageMenu from '../language-menu/language-menu.component';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserNavigation from './user-navigation/user-navigation.component';
import { useTranslation } from 'react-i18next';

const pages = {
    modules: {
        name: 'modules',
        subPages: {
            one: { name: 'one', path: '', redirect: false },
            two: { name: 'two', path: '', redirect: false }
        }
    },
    support: {
        name: 'support',
        subPages: {
            discord: { name: 'discord', path: 'https://discord.gg/BUQ8qPfSJY', redirect: true },
            documentation: { name: 'documentation', path: '', redirect: false },
            topgg: {
                name: 'topgg',
                path: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                redirect: true
            },
            faq: { name: 'faq', path: '/faq', redirect: false },
            status: { name: 'status', path: '/status', redirect: false }
        }
    }
};

const Header: React.FC = () => {
    const { t } = useTranslation();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [currentPage, setCurrentPage] = React.useState<string>('');

    const handleOpenNavMenu = (page: string) => (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
        setCurrentPage(page);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        setCurrentPage('');
    };

    return (
        <AppBar
            position="fixed"
            className="bg-primary text-blue"
            sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo */}
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        <Avatar
                            alt="Logo"
                            src="https://media.discordapp.net/attachments/763373897692217384/1186475116209643633/logo512.png"
                            sx={{ width: 56, height: 56 }}
                        />
                    </Typography>

                    <DrawerNavigation pages={pages} />

                    {/* Pages for larger screens */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex' },
                            visibility: { xs: 'hidden', md: 'visible' }
                        }}
                    >
                        {Object.entries(pages).map(([page, details]) =>
                            details.subPages ? (
                                <React.Fragment key={page}>
                                    <Button
                                        sx={{ color: 'white' }}
                                        onClick={handleOpenNavMenu(page)}
                                    >
                                        {t(`navigation.${details.name}.title`)}
                                        <Icon fontSize="small" className="ml-1 text-white">
                                            expand_more
                                        </Icon>
                                    </Button>
                                    <Menu
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left'
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left'
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                    >
                                        {currentPage === page &&
                                            Object.entries(details.subPages).map(
                                                ([subPage, subPageDetails]) => (
                                                    <MenuItem
                                                        key={subPage}
                                                        onClick={handleCloseNavMenu}
                                                        component={Link}
                                                        to={subPageDetails.path}
                                                    >
                                                        <Box display="flex" alignItems="center">
                                                            <Typography>
                                                                {t(
                                                                    `navigation.${details.name}.list.${subPageDetails.name}`
                                                                )}
                                                            </Typography>
                                                            {subPageDetails.redirect && (
                                                                <Icon
                                                                    color="primary"
                                                                    fontSize="small"
                                                                    className="ml-1"
                                                                >
                                                                    open_in_new
                                                                </Icon>
                                                            )}
                                                        </Box>
                                                    </MenuItem>
                                                )
                                            )}
                                    </Menu>
                                </React.Fragment>
                            ) : (
                                <Button
                                    key={page}
                                    component={Link}
                                    to={`/${page}`}
                                    sx={{ color: 'white' }}
                                >
                                    {t(`navigation.${details.name}`)}
                                </Button>
                            )
                        )}
                    </Box>

                    <LanguageMenu />

                    <UserNavigation />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
