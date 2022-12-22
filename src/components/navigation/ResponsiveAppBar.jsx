import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, Drawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { Link as BrowserLink, useNavigate } from 'react-router-dom';
import { Badge, Divider } from '@mui/material';
import { useComics } from '../../contexts/ComicProvider';
import { useAuth } from '../../contexts/AuthProvider';



function ResponsiveAppBar() {
    const { userData } = useComics();
    const { currentUser, logout } = useAuth();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    let navigate = useNavigate();

    const handleLogout = async () => {
        handleCloseUserMenu();
        try {
            await logout();
            navigate("/LogIn");
        } catch (error) {
            console.log(error);
        }
    }

    const handleProfile = () => {
        handleCloseUserMenu();
        navigate("/Profile");
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters id="back-to-top-anchor">
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={BrowserLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#DFCF00',
                            textDecoration: 'none',
                        }}
                    >
                        Marvel Master
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Drawer anchor="left" open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                            <MenuItem component={BrowserLink} to="/list/Part1">
                                Part 1
                            </MenuItem>
                            <MenuItem component={BrowserLink} to="/list/JHTMS">
                                Jonathan Hickman: TMS
                            </MenuItem>
                            <MenuItem component={BrowserLink} to="/Errors" >

                                <Typography color="secondary">
                                    Errors
                                </Typography>
                            </MenuItem>
                        </Drawer>

                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#DFCF00',
                            textDecoration: 'none',
                        }}
                    >
                        MarvelMaster
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '0.6rem' } }}>
                        <MenuItem component={BrowserLink} to="/list/Part1">
                            Part 1
                        </MenuItem>
                        <Divider variant="middle" flexItem orientation="vertical" />
                        <MenuItem component={BrowserLink} to="/list/JHTMS">
                            Jonathan Hickman: TMS
                        </MenuItem>
                        <Divider variant="middle" flexItem orientation="vertical" />
                        {userData.errors && <>
                            <Badge
                                badgeContent={userData.errors.length}
                                color="error"
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem component={BrowserLink} to="/Errors" >
                                    <Typography color="secondary">
                                        Errors
                                    </Typography>
                                </MenuItem>
                            </Badge>
                            <Divider variant="middle" flexItem orientation="vertical" />
                        </>
                        }
                    </Box>
                    {currentUser &&
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                <MenuItem onClick={handleProfile}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>}
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default ResponsiveAppBar;