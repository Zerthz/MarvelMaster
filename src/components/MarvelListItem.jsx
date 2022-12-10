import { Checkbox, Divider, List, ListItem, ListItemButton, ListItemText, Modal, Typography, Box, Button, Grid, Link, TextField, IconButton } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { Stack } from "@mui/system";
import React, { useContext, useState } from 'react';
import { MarvelMasterContext } from "../contexts/MasterProvider";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Delete } from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};
let imageFit = {
    width: "100%",
    height: "100%",
    objectFit: 'cover'
}

const MarvelListItem = ({ comic, counter, bg }) => {
    const [checked, setChecked] = useState(comic.read);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const [titleForm, setTitleForm] = useState(comic.seriesName);
    const [detailUrlForm, setDetailUrlForm] = useState(comic.detailUrl);
    const [imageUrlForm, setImageUrlForm] = useState(comic.imageUrl);
    const [descriptionForm, setDescriptionForm] = useState(comic.description);

    const { store, updateComic, removeComic } = useContext(MarvelMasterContext);

    const handleRemove = () => {
        removeComic(comic.id);
        handleClose();
    }
    const handleToggle = () => {
        setChecked(!checked);
        comic.read = !checked;
        store(comic.id, !checked);

    };
    const handleClose = () => {
        setOpen(false);
    }

    const openEdit = () => {
        handleClose();
        setEditOpen(true);
    }
    const handleEditClose = () => {
        setEditOpen(false);
    }

    const handleCancel = () => {
        handleEditClose();
        setOpen(true);
    }

    const handleDetailUrlChange = (event) => {
        setDetailUrlForm(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescriptionForm(event.target.value);
    }
    const handleImageUrlChange = (event) => {
        setImageUrlForm(event.target.value);
    }
    const handleTitleChange = (event) => {
        setTitleForm(event.target.value);
    }
    const handleSave = () => {
        updateComic(comic.id, titleForm, detailUrlForm, imageUrlForm, descriptionForm);

        handleCancel();
    }
    if (checked) {
        bg = 'lightgreen';
    }

    return (
        <>
            <ListItem
                sx={{ background: bg }}
                disablePadding
                key={comic.id}
                secondaryAction={
                    <Checkbox
                        edge="end"
                        onChange={handleToggle}
                        checked={checked}
                        color="success"
                    />
                }
            >
                <ListItemButton onClick={() => {
                    setOpen(true);
                }}>

                    <ListItemText primary={comic.seriesName} />
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={1}>
                        {comic.imageUrl ?
                            <Grid item xs={4}>
                                <a href={comic.detailUrl} target="_blank" rel="noreferrer">
                                    <img src={comic.imageUrl} alt="cover thumbnail" style={imageFit} />
                                </a>
                            </Grid> : null}

                        <Grid container item direction="column" xs={8} rowSpacing={0.9}>
                            <Stack direction="row">
                                <Grid item>
                                    <Typography id="modal-modal-title" variant="h4" component="h2">
                                        {comic.seriesName}
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <IconButton color="error" onClick={handleRemove}>
                                        <DeleteOutlineOutlinedIcon />
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
                                <Grid item alignSelf="end">
                                    <Button href={comic.detailUrl} variant="contained" size="large" target="_blank" rel="noreferrer" endIcon={<SendIcon />}>Link to comic</Button>
                                </Grid> : null}

                            <Grid item>
                                <Stack direction="row" spacing={2} justifyContent='flex-end'>
                                    <Button variant="outlined" startIcon={<EditIcon />} onClick={openEdit}>Edit</Button>
                                    {(checked && comic.detailUrl) ?
                                        <Button variant="outlined" startIcon={<ClearIcon />} color="error" onClick={handleToggle}>I've  not read this</Button>
                                        : <Button variant="outlined" startIcon={<BookIcon />} color="secondary" onClick={handleToggle}>I've read this</Button>}

                                    <Button variant="outlined" onClick={handleClose}>Close</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            <Modal
                open={editOpen}
                onClose={handleEditClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <List >
                        <ListItem>
                            <TextField label="Title" variant="outlined" value={titleForm} onChange={handleTitleChange} fullWidth />
                        </ListItem>
                        <ListItem inset>
                            <TextField label="Link Url" variant="outlined" value={detailUrlForm} onChange={handleDetailUrlChange} fullWidth />
                        </ListItem>
                        <ListItem inset>
                            <TextField label="Image Url" variant="outlined" value={imageUrlForm} onChange={handleImageUrlChange} fullWidth />
                        </ListItem>
                        <ListItem inset>
                            <TextField label="Description" variant="outlined" value={descriptionForm} onChange={handleDescriptionChange} fullWidth multiline rows={4} />
                        </ListItem>
                        <ListItem sx={{ justifyContent: 'flex-end' }}>
                            <Stack direction="row" spacing={2} >
                                <Button variant="contained" onClick={handleSave}>Save</Button>
                                <Button variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
                            </Stack>
                        </ListItem>
                    </List>

                </Box>
            </Modal>


        </>);
}

export default MarvelListItem;