import { Avatar, Box, Button, Icon, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import { useFetchUser } from '../../../utils/hooks/useFetchUser';
import { useTranslation } from 'react-i18next';

const settings = {
    dashboard: { name: 'Dashboard', path: '/dashboard' },
    logout: { name: 'Logout', path: '/logout' }
};

const UserNavigation: React.FC = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { user, error, loading } = useFetchUser();
    const { t } = useTranslation();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLoginClick = () => {
        window.location.href = 'http://localhost:3001/api/auth/login';
    };

    return (
        <div className="user-navigation">
            {user ? (
                <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                            alt="user avatar"
                            src="https://cdn.discordapp.com/avatars/294916386072035328/a_168c83ed825de6738c8fd2fdf42c1add.gif"
                        />
                        <Icon fontSize="small" className="ml-1 text-white">
                            expand_more
                        </Icon>
                    </IconButton>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {Object.entries(settings).map(([key, setting]) => (
                            <MenuItem
                                key={key}
                                onClick={handleCloseUserMenu}
                                component={Link}
                                to={setting.path}
                            >
                                <Typography textAlign="center">{setting.name}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            ) : (
                <Box boxShadow={10} borderRadius={5} overflow="hidden">
                    <Button
                        onClick={onLoginClick}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px',
                            color: 'white'
                        }}
                    >
                        <Icon color="inherit" fontSize="small" style={{ marginRight: '4px' }}>
                            discord
                        </Icon>
                        {t('navigation.userSettings.login')}
                    </Button>
                </Box>
            )}
        </div>
    );
};

export default UserNavigation;
