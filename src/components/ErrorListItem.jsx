import { Checkbox, Divider, List, ListItem, ListItemButton, ListItemText, Modal, Typography, Box, Button, Grid, Link, TextField } from "@mui/material";

import { Stack } from "@mui/system";
import React, { useContext, useState } from 'react';
import { MarvelMasterContext } from "../contexts/MasterProvider";


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


const ErrorListItem = ({ comic, bg }) => {
    const [editOpen, setEditOpen] = useState(false);

    const [titleForm, setTitleForm] = useState(comic.seriesName);
    const [detailUrlForm, setDetailUrlForm] = useState(comic.detailUrl);
    const [imageUrlForm, setImageUrlForm] = useState(comic.imageUrl);
    const [descriptionForm, setDescriptionForm] = useState(comic.description);

    const [titleError, setTitleError] = useState(false);
    const [detailError, setDetailError] = useState(true);
    const [imageError, setImageError] = useState(true);
    const [descriptionError, setDescriptionError] = useState(true);

    const { updateComic } = useContext(MarvelMasterContext);



    const handleEditClose = () => {
        setEditOpen(false);
    }

    const handleCancel = () => {
        setDetailUrlForm(comic.detailUrl);
        setDescriptionForm(comic.description);
        setImageUrlForm(comic.imageUrl);
        handleEditClose();
    }
    const handleTitleChange = (event) => {
        setTitleForm(event.target.value);
        if (event.target.value <= 0) {
            setTitleError(true);
        }
        else {
            setTitleError(false);
        }
    }
    const handleDetailUrlChange = (event) => {
        setDetailUrlForm(event.target.value);
        if (event.target.value <= 0) {
            setDetailError(true);
        }
        else {
            setDetailError(false);
        }
    }
    const handleDescriptionChange = (event) => {
        setDescriptionForm(event.target.value);
        if (event.target.value <= 0) {
            setDescriptionError(true);
        }
        else {
            setDescriptionError(false);
        }
    }
    const handleImageUrlChange = (event) => {
        setImageUrlForm(event.target.value);
        if (event.target.value <= 0) {
            setImageError(true);
        }
        else {
            setImageError(false);
        }
    }

    const handleSave = () => {
        if (detailUrlForm && imageUrlForm && descriptionForm && titleForm) {
            updateComic(comic.id, titleForm, detailUrlForm, imageUrlForm, descriptionForm);
            handleEditClose();
        }

    }


    return (
        <>
            <ListItem
                sx={{ background: bg }}
                disablePadding
                key={comic.id}
            >
                <ListItemButton onClick={() => {
                    setEditOpen(true);
                }}>

                    <ListItemText primary={comic.seriesName + ' #' + comic.issue} />
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            <Modal
                open={editOpen}
                onClose={handleEditClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <List >
                        <ListItem>
                            <TextField label="Title" variant="outlined" value={titleForm} onChange={handleTitleChange} error={titleError} fullWidth />
                        </ListItem>
                        <ListItem>
                            <TextField label="Link Url" variant="outlined" value={detailUrlForm} onChange={handleDetailUrlChange} error={detailError} fullWidth />
                        </ListItem>
                        <ListItem>
                            <TextField label="Image Url" variant="outlined" value={imageUrlForm} onChange={handleImageUrlChange} error={imageError} fullWidth />
                        </ListItem>
                        <ListItem>
                            <TextField label="Description" variant="outlined" value={descriptionForm}
                                onChange={handleDescriptionChange} error={descriptionError} fullWidth multiline rows={4} />
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

export default ErrorListItem;