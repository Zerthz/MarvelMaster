import { Divider, Drawer, ListItemText, MenuItem, Typography } from "@mui/material";
import { Link as BrowserLink } from 'react-router-dom';
import { useAuth } from "../../../contexts/AuthProvider";


const NavDrawer = ({ anchorElNav, handleCloseNavMenu }) => {
    const { currentUser } = useAuth();
    return (
        <Drawer anchor="left" open={Boolean(anchorElNav)} variant="temporary" onClose={handleCloseNavMenu} PaperProps={{ sx: { minWidth: 'fit-content', width: '50vw' } }}>
            {/* <Typography variant='h6' pl={2} mt={2}>
                Marvel Master
            </Typography>
            <Divider />
            <MenuItem component={BrowserLink} to="/list/Part1">
                <ListItemText inset>
                    Part 1
                </ListItemText>
            </MenuItem> */}

            <Typography variant='h6' pl={2} mt={2}>
                Cosmic
            </Typography>
            <Divider />
            <MenuItem component={BrowserLink} to="/list/Annhilation">
                <ListItemText inset>
                    Annhilation
                </ListItemText>
            </MenuItem>
            <Typography variant='h6' pl={2} mt={2}>
                X-Men
            </Typography>
            <Divider />
            <MenuItem component={BrowserLink} to="/list/PheonixSaga">
                <ListItemText inset>
                    Pheonix Saga
                </ListItemText>
            </MenuItem>
            <MenuItem component={BrowserLink} to="/list/XMenDays">
                <ListItemText inset>
                    Days of Future Past
                </ListItemText>
            </MenuItem>
            <MenuItem component={BrowserLink} to="/list/Xmen">
                <ListItemText inset>
                    Modern X-Men <span style={{ fontStyle: 'italic' }}>(10+ years)</span>
                </ListItemText>
            </MenuItem>
            <MenuItem component={BrowserLink} to="/list/HoXPoX">
                <ListItemText inset>
                    House of X / Powers of X
                </ListItemText>
            </MenuItem>

            <Typography variant='h6' pl={2} mt={2}>
                Others
            </Typography>
            <Divider />
            <MenuItem component={BrowserLink} to="/list/JHTMS">
                <ListItemText inset>
                    Jonathan Hickman: TMS
                </ListItemText>
            </MenuItem>
            {currentUser.admin &&
                < MenuItem component={BrowserLink} to="/Errors" >
                    <ListItemText inset>
                        <Typography color="secondary">
                            Errors
                        </Typography>
                    </ListItemText>
                </MenuItem>
            }
        </Drawer >
    );
}

export default NavDrawer;