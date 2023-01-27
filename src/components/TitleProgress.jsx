import { MoreHoriz } from "@mui/icons-material";
import { Grid, IconButton, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useComics } from "../contexts/ComicProvider";
import { getComicsLength, getReadComicsLength } from "../services/GetComicsLength";

const TitleProgress = () => {

    const { supportedLists, userData } = useComics();
    const { id } = useParams();

    const [loading, setLoading] = useState();
    const [percent, setPercent] = useState(0);
    const [progressText, setProgressText] = useState();

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

                <Paper sx={{ width: { xs: '90%', lg: '25%' }, padding: '0.6em', position: 'relative' }}>
                    <IconButton sx={{ position: 'absolute', top: '0px', right: '8px', opacity: 0.25 }}>
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

            }
        </>
    );
}

export default TitleProgress;