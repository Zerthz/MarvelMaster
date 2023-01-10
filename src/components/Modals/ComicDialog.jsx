import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, Divider, Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import BookIcon from '@mui/icons-material/Book';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { useComics } from "../../contexts/ComicProvider";
import { useState } from "react";
import EditDialog from "./EditDialog";




let imageFit = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
}


const ComicDialog = (props) => {
    const { open, handleClose, comic, handleToggle, checked, arcIndex } = props;

    const { removeComic } = useComics();

    const [toggled, setToggled] = useState(checked);
    const [editOpen, setEditOpen] = useState(false);

    const handleRemove = () => {
        removeComic(comic.Id);
        handleClose();
    }

    const handleDialogToggle = () => {
        setToggled(!toggled);
        handleToggle();
    }
    const handleEditOpen = () => {
        setEditOpen(true);
    }
    const handleEditClose = () => {
        setEditOpen(false);
    }

    const handleEditCancel = () => {
        handleEditClose();
    }




    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Grid container spacing={1} sx={{ flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'center' }}>
                        {comic.ImageUrl ?
                            < Grid item lg={4} xs={7} p={0} >
                                <a href={comic.DetailUrl} target="_blank" rel="noreferrer">
                                    <img src={comic.ImageUrl} alt="cover thumbnail" style={imageFit} />
                                </a>
                            </Grid> : null}


                        <Grid container item direction="column" xs={12} lg={8} rowSpacing={0.9}>
                            <Stack direction="row">
                                <Grid item>
                                    <Typography id="modal-modal-title" variant="h4" component="h2">
                                        {comic.SeriesName}
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <IconButton color="error" onClick={handleRemove}>
                                        <DeleteOutlineOutlined />
                                    </IconButton>
                                </Grid>
                            </Stack>
                            {comic.Comment ?
                                <Grid item>
                                    <Typography sx={{ fontStyle: 'italic' }}>
                                        {comic.Comment}
                                    </Typography>
                                </Grid> : null}
                            <Grid item>
                                <Divider variant="middle" item />

                            </Grid>
                            {comic.Description ? <>
                                <Grid item>
                                    <Typography variant="body">
                                        {comic.Description}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Divider variant="middle" item />
                                </Grid>
                            </>
                                : null}
                            {comic.DetailUrl ?
                                <Grid item sx={{ alignSelf: { xs: 'center', lg: 'end' } }}>
                                    <Button href={comic.DetailUrl} variant="contained" size="large" target="_blank" rel="noreferrer" endIcon={<SendIcon />}>Link to comic</Button>
                                </Grid> : null}
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEditOpen}>Edit</Button>
                    {(toggled && comic.DetailUrl) ?
                        <Button variant="outlined" startIcon={<ClearIcon />} color="error" onClick={handleDialogToggle}>Remove</Button>
                        : <Button variant="outlined" startIcon={<BookIcon />} color="success" onClick={handleDialogToggle}>Read</Button>}

                    <Button variant="outlined" onClick={handleClose}>Close</Button>
                </DialogActions>

            </Dialog >
            <EditDialog open={editOpen} onClose={handleEditClose} comic={comic} onCancel={handleEditCancel} arcIndex={arcIndex} />

        </>
    );
}

export default ComicDialog;