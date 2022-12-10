import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Divider, Link, MenuItem } from '@mui/material';
import { MarvelMasterContext } from '../../contexts/MasterProvider';
import { useContext } from 'react';


export default function DenseAppBar() {
    const { errorCount } = useContext(MarvelMasterContext);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense" sx={{ gap: '20px', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                    <MenuItem component="a" href="/Part1">
                        Part 1
                    </MenuItem>
                    <Divider variant="middle" flexItem orientation="vertical" />
                    <Badge
                        badgeContent={errorCount}
                        color="error"
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem component="a" href="/Errors">

                            <Typography color="secondary">
                                Errors
                            </Typography>
                        </MenuItem>
                    </Badge>
                </Toolbar>
            </AppBar>
        </Box >
    );
}