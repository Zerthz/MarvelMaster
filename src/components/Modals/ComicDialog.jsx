import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, Divider, Grid, IconButton, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import BookIcon from '@mui/icons-material/Book';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { useComics } from "../../contexts/ComicProvider";
import { useState } from "react";
import EditDialog from "./EditDialog";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";




let imageFit = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
}


const ComicDialog = (props) => {
    const { open, handleClose, comic, handleToggle, checked, arcIndex } = props;

    const { removeComic, updateRating } = useComics();
    const { currentUser } = useAuth();
    const { id } = useParams();

    const [toggled, setToggled] = useState(checked);
    const [editOpen, setEditOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState();

    const handleRemove = () => {
        removeComic(comic.Id);
        handleClose();
    }

    const handleDialogToggle = () => {
        setToggled(!toggled);
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

    const close = () => {
        if (comic.Rating !== ratingValue) {
            updateRating(id.toLowerCase(), comic, arcIndex, ratingValue);
        }
        if (comic.Read !== toggled) {
            handleToggle();
        }

        handleClose();
    }




    return (
        <>
            <Dialog open={open} onClose={close}>
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
                                {currentUser.admin && <Grid item >
                                    <IconButton color="error" onClick={handleRemove}>
                                        <DeleteOutlineOutlined />
                                    </IconButton>
                                </Grid>
                                }
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
                                <>
                                    <Grid container item sx={{ justifyContent: 'space-between' }}>
                                        <Grid item>
                                            <Grid item>
                                                <Typography variant="subtitle2" sx={{ fontStyle: 'italic' }}>
                                                    {comic.Rating ? "Rated" : "Rate it!"}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Rating value={ratingValue}
                                                    precision={0.5}
                                                    onChange={(event, newValue) => {
                                                        setRatingValue(newValue);
                                                    }} />
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{ alignSelf: 'center' }}>
                                            <Button href={comic.DetailUrl} variant="contained" size="large" target="_blank" rel="noreferrer" endIcon={<SendIcon />}>Link to comic</Button>
                                        </Grid>
                                    </Grid>
                                </> : null}
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    {currentUser.admin &&
                        <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEditOpen}>Edit</Button>
                    }
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