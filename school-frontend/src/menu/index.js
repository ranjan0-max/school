import { Box, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// icons
import EngineeringIcon from '@mui/icons-material/Engineering';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// custom hook
import useAuth from 'customHook/useAuth';
import useWindowSize from 'customHook/useWindowSize';

// components
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const drawerWidth = 200;
const collapsedDrawerWidth = 72;

export default function PermanentDrawerLeft() {
    const { menu } = useAuth();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();

    const [isMobile, setIsMobile] = useState(false);
    const [menuGroups, setMenuGroups] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const handleMenuItemClick = (path, selectedLabel) => {
        navigate(path);
    };

    const handleDrawer = () => {
        if (isMobile) {
            setIsDrawerOpen(false);
        } else {
            setIsDrawerOpen(!isDrawerOpen);
        }
    };

    const groupMenuItems = (menuItems) => {
        let masterMenus = [];
        let classMenus = [];

        menuItems.forEach((menuGroup) => {
            if (menuGroup?.id === 'master') {
                masterMenus = menuGroup.children;
            }
            if (menuGroup?.id === 'operations') {
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
                group: 'Operations',
                icon: <EngineeringIcon />,
                items: classMenus
            }
        ];
    };

    React.useEffect(() => {
        const groupedData = groupMenuItems(menu);
        setMenuGroups(groupedData);
    }, [menu]);

    React.useEffect(() => {
        if (width < 800) {
            setIsMobile(true);
            setIsDrawerOpen(false);
        } else {
            setIsMobile(false);
        }
    }, [width, height]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <CssBaseline />
            {/* Header */}
            <Box
                component="header"
                sx={{
                    mb: 3,
                    width: '100%',
                    zIndex: (theme) => theme.zIndex.appBar,
                    position: 'sticky',
                    top: 0
                }}
            >
                <Header />
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <Box
                    sx={{
                        overflowX: 'auto',
                        position: 'sticky',
                        zIndex: (theme) => theme.zIndex.drawer + 2
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
                        ml: 3,
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        pt: 6,
                        pl: 4,
                        pr: 2,
                        overflowY: 'auto',
                        height: '100%', // Ensure content fits without overlap
                        mt: 2
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    bgcolor: 'background.paper',
                    textAlign: 'center',
                    height: '48px',
                    position: 'sticky',
                    bottom: 0
                }}
            >
                <Footer />
            </Box>
        </Box>
    );
}
