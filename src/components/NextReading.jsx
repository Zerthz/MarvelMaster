import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Collapse, Grid, IconButton, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useComics } from "../contexts/ComicProvider";
import { useState } from 'react';
import { Box } from '@mui/system';

const NextReading = ({ text }) => {
    const { id } = useParams();
    const { supportedLists } = useComics();

    const [expanded, setExpanded] = useState(true);

    let imgLink = {
        width: '75%',
    }
    let flex = {
        display: 'flex',
        justifyContent: 'center'
    }
    const handleExpand = () => {
        setExpanded(!expanded);
    }
    return (
        <>
            <Box sx={{ width: { xs: '90%', lg: '25%' }, marginBottom: '2em' }} >
                <IconButton sx={{ display: 'flex', marginLeft: 'auto', opacity: '0.1' }} onClick={handleExpand}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <Collapse in={expanded} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <Grid direction="row" container sx={{ alignItems: 'center' }}>
                        <Grid item xs={4}>
                            <Typography variant="h5" align="center" sx={{ fontStyle: 'italic' }}>
                                {text}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Link to={"/list/" + supportedLists[id.toLowerCase()].nextReading.name} style={flex}>
                                <img src={supportedLists[id.toLowerCase()].nextReading.url} alt="previous reading" style={imgLink} />
                            </Link>
                        </Grid>
                    </Grid>
                </Collapse>
            </Box>
        </>
    );
}

export default NextReading;