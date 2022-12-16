import { Checkbox, Divider, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useState } from 'react';
import { useComics } from "../contexts/ComicProvider";
import ComicDialog from "./Modals/ComicDialog";


const MarvelListItem = ({ comic, counter, bg }) => {
    const { store } = useComics();


    const [checked, setChecked] = useState(comic.read);
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setChecked(!checked);
        comic.read = !checked;
        store(comic.id, !checked);

    };
    const handleClose = () => {
        setOpen(false);
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
        </>);
}

export default MarvelListItem;