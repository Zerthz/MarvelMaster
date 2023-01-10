import { Divider, Drawer, ListItemText, MenuItem, Typography } from "@mui/material";
import { Link as BrowserLink } from 'react-router-dom';


const NavDrawer = ({ anchorElNav, handleCloseNavMenu }) => {
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
                Others
            </Typography>
            <Divider />
            <MenuItem component={BrowserLink} to="/list/JHTMS">
                <ListItemText inset>
                    Jonathan Hickman: TMS
                </ListItemText>
            </MenuItem>
            <MenuItem component={BrowserLink} to="/Errors" >
                <ListItemText inset>
                    <Typography color="secondary">
                        Errors
                    </Typography>
                </ListItemText>
            </MenuItem>
        </Drawer>
    );
}

export default NavDrawer;