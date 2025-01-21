import { Box, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// icons
import ClassIcon from '@mui/icons-material/Class';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// custom hook
import useAuth from 'customHook/useAuth';

// components
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const drawerWidth = 200;
const expandedDrawerWidth = 200;
const collapsedDrawerWidth = 72;

export default function PermanentDrawerLeft() {
    const { menu } = useAuth();
    const navigate = useNavigate();

    const [label, setLabel] = useState('');
    const [menuGroups, setMenuGroups] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const handleMenuItemClick = (path, selectedLabel) => {
        navigate(path);
        setLabel(selectedLabel);
    };

    const handleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const groupMenuItems = (menuItems) => {
        let masterMenus = [];
        let classMenus = [];

        menuItems.forEach((menuGroup) => {
            if (menuGroup && menuGroup.id === 'master') {
                masterMenus = menuGroup.children;
            }

            if (menuGroup && menuGroup.id === 'salesGroup') {
                classMenus = menuGroup.children;
            }
        });

        return [
            {
                group: 'Masters',
                icon: <ManageAccountsIcon />,
                items: masterMenus
            },
            {
                group: 'Classes',
                icon: <ClassIcon />,
                items: classMenus
            }
        ];
    };

    React.useEffect(() => {
        const groupedData = groupMenuItems(menu);
        setMenuGroups(groupedData);
    }, [menu]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <CssBaseline />
            {/* Header */}
            <Box
                component="header"
                sx={{
                    p: 2,
                    width: '100%',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    height: 'calc(100vh - 53vh - 100vh)'
                }}
            >
                <Header isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer} />
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <Box
                    sx={{
                        width: isDrawerOpen ? drawerWidth : collapsedDrawerWidth,
                        overflowY: 'auto',
                        position: 'sticky',
                        top: 64, // Adjust for the header height
                        transition: 'width 0.3s ease'
                    }}
                >
                    <Sidebar
                        drawerWidth={drawerWidth}
                        accessableMenuList={menuGroups}
                        handleMenuItemClick={handleMenuItemClick}
                        isDrawerOpen={isDrawerOpen}
                        handleDrawer={handleDrawer}
                    />
                </Box>
                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        pt: 6,
                        pl: 4,
                        pr: 2,
                        overflowY: 'auto',
                        transition: 'width 0.3s ease',
                        height: 'calc(100vh)' // Ensuring content fits without overlap
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    bgcolor: 'background.paper',
                    textAlign: 'center',
                    height: '48px'
                }}
            >
                <Footer />
            </Box>
        </Box>
    );
}
