import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, Divider, Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import BookIcon from '@mui/icons-material/Book';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { useComics } from "../contexts/ComicProvider";
import { useState } from "react";




let imageFit = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
}


const ComicDialog = (props) => {
    const { open, handleClose, comic, handleToggle, checked } = props;

    const { removeComic } = useComics();

    const [toggled, setToggled] = useState(checked);

    const handleRemove = () => {
        removeComic(comic.id);
        handleClose();
    }

    const handleDialogToggle = () => {
        setToggled(!toggled);
        handleToggle();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Grid container spacing={1} sx={{ flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'center' }}>
                    {comic.imageUrl ?
                        < Grid item lg={4} xs={7} p={0} >
                            <a href={comic.detailUrl} target="_blank" rel="noreferrer">
                                <img src={comic.imageUrl} alt="cover thumbnail" style={imageFit} />
                            </a>
                        </Grid> : null}


                    <Grid container item direction="column" xs={12} lg={8} rowSpacing={0.9}>
                        <Stack direction="row">
                            <Grid item>
                                <Typography id="modal-modal-title" variant="h4" component="h2">
                                    {comic.seriesName}
                                </Typography>
                            </Grid>
                            <Grid item >
                                <IconButton color="error" onClick={handleRemove}>
                                    <DeleteOutlineOutlined />
                                </IconButton>
                            </Grid>
                        </Stack>
                        {comic.comment ?
                            <Grid item>
                                <Typography sx={{ fontStyle: 'italic' }}>
                                    {comic.comment}
                                </Typography>
                            </Grid> : null}
                        <Grid item>
                            <Divider variant="middle" item />

                        </Grid>
                        {comic.description ?
                            <Grid item>
                                <Typography variant="body">
                                    {comic.description}
                                </Typography>
                            </Grid> : null}
                        <Grid item>
                            <Divider variant="middle" item />

                        </Grid>
                        {comic.detailUrl ?
                            <Grid item sx={{ alignSelf: { xs: 'center', lg: 'end' } }}>
                                <Button href={comic.detailUrl} variant="contained" size="large" target="_blank" rel="noreferrer" endIcon={<SendIcon />}>Link to comic</Button>
                            </Grid> : null}
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" startIcon={<EditIcon />}>Edit</Button>
                {(toggled && comic.detailUrl) ?
                    <Button variant="outlined" startIcon={<ClearIcon />} color="error" onClick={handleDialogToggle}>Remove</Button>
                    : <Button variant="outlined" startIcon={<BookIcon />} color="success" onClick={handleDialogToggle}>Read</Button>}

                <Button variant="outlined" onClick={handleClose}>Close</Button>
            </DialogActions>

        </Dialog >
    );
}

export default ComicDialog;