import { Box, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// icons
import ClassIcon from '@mui/icons-material/Class';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// custom hook
import useAuth from 'customHook/useAuth';

// api

// component
import Header from './Header';
import Sidebar from './Sidebar';

const drawerWidth = 200;

export default function PermanentDrawerLeft() {
    const { menu } = useAuth();
    const navigate = useNavigate();

    const [label, setLabel] = useState('');
    const [menuGroups, setMenuGroups] = useState([]);

    const handleMenuItemClick = (path, selectedLabel) => {
        navigate(path);
        setLabel(selectedLabel);
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
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            {/* Header */}
            <Box sx={{ position: 'fixed', width: `calc(100% - ${drawerWidth}px)`, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Header label={label} />
            </Box>
            {/* Sidebar */}
            <Sidebar drawerWidth={drawerWidth} accessableMenuList={menuGroups} handleMenuItemClick={handleMenuItemClick} />
            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    borderRadius: '5px',
                    marginLeft: '3%',
                    marginRight: '3%',
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    marginTop: '55px', // Shift content from Header (assuming 64px height for Header)
                    overflowY: 'auto' // Enable scrolling if content exceeds height
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
