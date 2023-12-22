import { Box, Button, Drawer, Icon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IDrawerNavigationProps {
    pages: any;
}

export const DrawerNavigation: React.FC<IDrawerNavigationProps> = ({ pages }) => {
    const [expandedPage, setExpandedPage] = React.useState<string | null>(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const { t } = useTranslation();

    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handlePageClick = (page: string) => {
        if (expandedPage === page) {
            setExpandedPage(null);
        } else {
            setExpandedPage(page);
        }
    };

    const renderSubPages = (module: any) => {
        const { subPages } = module;
        return Object.keys(subPages).map(subPageName => {
            const subPage = subPages[subPageName];
            return (
                <div key={subPageName}>
                    <Button
                        sx={{ color: 'white', width: '100%' }}
                        onClick={() => {
                            if (!subPage.subPages) {
                                setDrawerOpen(false);
                            }
                        }}
                    >
                        {t(`navigation.${module.name}.list.${subPageName}`)}
                    </Button>
                </div>
            );
        });
    };

    return (
        <>
            {/* Hamburger icon for small screens */}
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ display: { md: 'none' } }}
                onClick={handleToggleDrawer}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                ModalProps={{ keepMounted: true }}
            >
                <Box
                    sx={{
                        width: 200,
                        marginTop: '64px',
                        backgroundColor: 'primary.main',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {Object.keys(pages).map(moduleName => {
                        const module = pages[moduleName];

                        return (
                            <div key={moduleName}>
                                <Button
                                    sx={{ color: 'white', width: '100%' }}
                                    onClick={() => handlePageClick(moduleName)}
                                >
                                    {t(`navigation.${module.name}.title`)}
                                    {expandedPage === moduleName ? (
                                        <Icon fontSize="small" className="ml-1 text-white">
                                            expand_less
                                        </Icon>
                                    ) : (
                                        <Icon fontSize="small" className="ml-1 text-white">
                                            expand_more
                                        </Icon>
                                    )}
                                </Button>
                                {expandedPage === moduleName && module.subPages && (
                                    <Box sx={{ paddingLeft: 2, width: '100%' }}>
                                        {renderSubPages(module)}
                                    </Box>
                                )}
                            </div>
                        );
                    })}
                </Box>
            </Drawer>
        </>
    );
};
