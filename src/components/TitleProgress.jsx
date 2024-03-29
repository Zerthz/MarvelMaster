import { MoreHoriz } from "@mui/icons-material";
import { IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useComics } from "../contexts/ComicProvider";
import { getComicsLength, getReadComicsLength } from "../services/GetComicsLength";

const TitleProgress = () => {

    const { supportedLists, userData, markOrderAsRead, markOrderAsUnread } = useComics();
    const { id } = useParams();

    const [loading, setLoading] = useState();
    const [percent, setPercent] = useState(0);
    const [progressText, setProgressText] = useState();
    const [anchorElOptions, setAnchorElOptions] = useState(null);

    const handleCloseOptions = () => {
        setAnchorElOptions(null);
    }

    const handleOptionsMenu = (event) => {
        setAnchorElOptions(event.currentTarget);
    }

    const handleMarkAsRead = () => {
        handleCloseOptions();
        markOrderAsRead(id);
    }
    const handleMarkAsUnread = () => {
        handleCloseOptions();
        markOrderAsUnread(id);
    }

    const total = (arcs) => {
        let num = 0;
        arcs.forEach(arc => {
            num += getComicsLength(arc);
        });
        return num;

    }

    const readC = (arcs) => {
        let num = 0;
        arcs.forEach(arc => {
            num += getReadComicsLength(arc);
        });
        return num;
    }
    useEffect(() => {
        setLoading(true);
        try {
            let arcs = userData[id.toLowerCase()]

            let totalComics = total(arcs);
            let readComics = readC(arcs);
            let percent = Math.round((readComics / totalComics) * 100)
            setPercent(percent);

            setProgressText(`You've read ${readComics} out of ${totalComics} comics (${percent}%)`)
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }, [userData, id])

    return (
        <>
            {!loading &&
                <>
                    <Paper sx={{ width: { xs: '90%', lg: '25%' }, padding: '0.6em', position: 'relative' }}>
                        <IconButton sx={{ position: 'absolute', top: '0px', right: '8px', opacity: 0.25 }}
                            onClick={handleOptionsMenu}>
                            <MoreHoriz />
                        </IconButton>
                        <Typography variant="h4" textAlign="center">
                            {supportedLists[id.toLowerCase()].title}
                        </Typography>

                        <Typography align="center" variant="subtitle1">
                            {progressText}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <LinearProgress value={percent} variant="determinate" color="success" sx={{ width: '80%', height: '0.5em' }} />
                        </Box>
                        <Typography align="center" variant="body1" paragraph paddingTop={1}>
                            {supportedLists[id.toLowerCase()].description}
                        </Typography>
                    </Paper>
                    <Menu
                        anchorEl={anchorElOptions}
                        keepMounted
                        open={Boolean(anchorElOptions)}
                        onClose={handleCloseOptions}
                    >
                        <MenuItem onClick={handleMarkAsRead} disabled={percent === 100}>
                            Mark As Read
                        </MenuItem>
                        <MenuItem onClick={handleMarkAsUnread} disabled={percent === 0}>
                            Mark As Unread
                        </MenuItem>
                    </Menu>
                </>

            }
        </>
    );
}

export default TitleProgress;