import { Checkbox, Divider, List, ListItem, ListItemButton, ListItemText, Modal, Box, Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from 'react';
import { useComics } from "../contexts/ComicProvider";
import ComicDialog from "./Modals/ComicDialog";

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

const MarvelListItem = ({ comic, counter, bg }) => {
    const [checked, setChecked] = useState(comic.read);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const [titleForm, setTitleForm] = useState(comic.seriesName);
    const [detailUrlForm, setDetailUrlForm] = useState(comic.detailUrl);
    const [imageUrlForm, setImageUrlForm] = useState(comic.imageUrl);
    const [descriptionForm, setDescriptionForm] = useState(comic.description);

    const { store, updateComic, removeComic } = useComics();


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


            <ComicDialog open={open} handleClose={handleClose}
                onClick={() => setOpen(true)} handleToggle={handleToggle}
                comic={comic} checked={checked} />


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