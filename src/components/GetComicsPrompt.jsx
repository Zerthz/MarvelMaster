import { Button, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useContext } from "react";
import { MarvelMasterContext } from "../contexts/MasterProvider";

const GetComicsPrompt = () => {
    const { fetchComics } = useContext(MarvelMasterContext);

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
                        <Button variant="contained" color="secondary" onClick={fetchComics}>Click</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default GetComicsPrompt;