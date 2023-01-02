import { LinearProgress, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useComics } from "../contexts/ComicProvider";
import getReadComics from "../services/GetReadComics";

const TitleProgress = () => {

    const { supportedLists, userData } = useComics();
    const { id } = useParams();

    const [loading, setLoading] = useState();
    const [percent, setPercent] = useState();
    const [progressText, setProgressText] = useState();


    useEffect(() => {
        setLoading(true);
        try {
            let comics = userData[id.toLowerCase()]
            let read = getReadComics(comics);
            let percent = Math.round((read.length / comics.length) * 100)
            setPercent(percent);

            setProgressText(`You've read ${read.length} out of ${comics.length} comics (${percent}%)`)
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
                <Paper sx={{ width: { xs: '90%', lg: '25%' }, padding: '0.6em' }}>
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