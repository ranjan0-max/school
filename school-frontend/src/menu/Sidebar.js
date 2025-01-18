import SchoolIcon from '@mui/icons-material/School';
import {
    Box,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import { useState } from 'react';

// icons
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const Sidebar = ({ drawerWidth, accessableMenuList, handleMenuItemClick }) => {
    const [openGroups, setOpenGroups] = useState({});
    const [selectedGroup, setSelectedGroup] = useState(null); // Track the selected group
    const [selectedItem, setSelectedItem] = useState(null); // Track the selected item

    // Toggle groups and close the others
    const handleGroupSelection = (group) => {
        setSelectedGroup(group); // Set the selected group
        setOpenGroups((prevState) => {
            const newOpenGroups = {};
            newOpenGroups[group] = !prevState[group]; // Toggle the selected group
            return newOpenGroups; // Only the selected group will be toggled
        });
    };

    const handleItemSelection = (menu) => {
        setSelectedItem(menu.title); // Set the selected item
        handleMenuItemClick(menu.url, menu.title); // Call the parent function to handle navigation
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: 'white',
                    zIndex: (theme) => theme.zIndex.appBar - 1 // Ensure Drawer is below AppBar
                }
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar style={{ paddingLeft: '5%' }}>
                <SchoolIcon />
                <Typography sx={{ fontWeight: 'bolder', marginLeft: 1 }}>School Manager</Typography>
            </Toolbar>
            <List disablePadding>
                {accessableMenuList.map((menu) => (
                    <div key={menu.group}>
                        <Divider />
                        <ListItem
                            key={menu.group}
                            disablePadding
                            sx={{
                                backgroundColor: selectedGroup === menu.group ? '#bbeeff' : 'inherit', // Background for selected group
                                '&:hover': { backgroundColor: '#bbeeff' }, // Hover effect on group
                                transition: 'background-color 0.3s ease' // Smooth transition
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    paddingLeft: 2 // Add some padding for better spacing
                                }}
                                onClick={() => handleGroupSelection(menu.group)} // Select group
                            >
                                <IconButton
                                    sx={{
                                        color: selectedGroup === menu.group ? 'primary.main' : 'inherit', // Highlight the selected icon
                                        transition: 'color 0.3s'
                                    }}
                                >
                                    {menu.icon}
                                </IconButton>
                                <ListItemButton sx={{ flexGrow: 1 }}>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '14px',
                                                    color: selectedGroup === menu.group ? 'primary.main' : 'inherit', // Highlight the label of selected group
                                                    transition: 'color 0.3s'
                                                }}
                                            >
                                                {menu.group}
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                                <IconButton sx={{ marginLeft: 1 }}>{openGroups[menu.group] ? <ExpandLess /> : <ExpandMore />}</IconButton>
                            </Box>
                        </ListItem>

                        {/* Collapse the menu items when group is opened */}
                        <Collapse key={menu.id} in={openGroups[menu.group]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ pl: 2 }}>
                                {menu.items.map((menu) => (
                                    <ListItem
                                        key={menu.id}
                                        disablePadding
                                        sx={{
                                            '&:hover': { backgroundColor: '#bbeeff' }, // Hover effect on menu items
                                            transition: 'background-color 0.3s ease' // Smooth transition
                                        }}
                                    >
                                        <ListItemButton onClick={() => handleItemSelection(menu)}>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        sx={{
                                                            display: 'flex',
                                                            fontSize: '14px',
                                                            color: 'gray',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        {menu.title}
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
