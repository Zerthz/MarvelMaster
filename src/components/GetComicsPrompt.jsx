import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useComics } from "../contexts/ComicProvider";

const GetComicsPrompt = () => {
    const { fetchComics } = useComics();

    const { id } = useParams();

    const handleFetch = () => {
        fetchComics(id);
    }
    return (
        <>
            <Box>
                <Grid container direction="column">
                    <Grid item>
                        <Typography align="center" variant="h5">Oops!</Typography>
                        <Typography align="center" variant="body1">There are no comics cached in this browser.</Typography>
                        <Typography align="center" variant="body1">Do you wish to fetch new ones?</Typography>
                    </Grid>
                    <Grid item alignSelf="center">
                        <Button variant="contained" color="secondary" onClick={handleFetch}>Cli ck</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default GetComicsPrompt;