import { Button, Dialog, DialogActions, DialogContent, List, ListItem, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useComics } from "../../contexts/ComicProvider";


const EditDialog = (props) => {
    const { open, onClose, onCancel, comic } = props;

    const { updateComic } = useComics();

    const [titleForm, setTitleForm] = useState(comic.seriesName);
    const [detailUrlForm, setDetailUrlForm] = useState(comic.detailUrl || "");
    const [imageUrlForm, setImageUrlForm] = useState(comic.imageUrl || "");
    const [descriptionForm, setDescriptionForm] = useState(comic.description || "");
    const [commentForm, setCommentForm] = useState(comic.comment || "");

    const [titleError, setTitleError] = useState(false);
    const [detailError, setDetailError] = useState(true);
    const [imageError, setImageError] = useState(true);


    const handleSave = () => {
        if (detailUrlForm && imageUrlForm && titleForm) {
            updateComic(comic.id, titleForm, detailUrlForm, imageUrlForm, descriptionForm, commentForm);
            onClose();
        }
    }
    const handleCancel = () => {
        setTitleForm(comic.seriesName);
        setDetailUrlForm(comic.detailUrl);
        setImageUrlForm(comic.imageUrl);
        setDescriptionForm(comic.description);
        setCommentForm(comic.comment);
        onCancel();
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
    const handleImageUrlChange = (event) => {
        setImageUrlForm(event.target.value);
        if (event.target.value <= 0) {
            setImageError(true);
        }
        else {
            setImageError(false);
        }
    }
    const handleDescriptionChange = (event) => {
        setDescriptionForm(event.target.value);

    }
    const handleCommentChange = (event) => {
        setCommentForm(event.target.value);
    }


    return (
        <Dialog open={open} onClose={handleCancel} >
            <DialogContent>
                <List sx={{ width: { lg: '500px' } }}>
                    <ListItem>
                        <TextField label="Title" variant="outlined" value={titleForm} onChange={handleTitleChange} error={titleError} fullWidth />
                    </ListItem>
                    <ListItem>
                        <TextField label="Link Url" variant="outlined" value={detailUrlForm} onChange={handleDetailUrlChange} error={detailError} fullWidth />
                    </ListItem>
                    <ListItem>
                        <TextField label="Image Url" variant="outlined" value={imageUrlForm} onChange={handleImageUrlChange} error={imageError} fullWidth />
                    </ListItem> <ListItem>
                        <TextField label="Comments" variant="outlined" value={commentForm}
                            onChange={handleCommentChange} fullWidth />
                    </ListItem>
                    <ListItem>
                        <TextField label="Description" variant="outlined" value={descriptionForm}
                            onChange={handleDescriptionChange} fullWidth multiline rows={4} />
                    </ListItem>
                </List>
                <DialogActions>
                    <Stack direction="row" spacing={2} >
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                        <Button variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
                    </Stack>
                </DialogActions>


            </DialogContent>

        </Dialog>
    );
}

export default EditDialog;