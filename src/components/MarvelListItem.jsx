import { Checkbox, Divider, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useComics } from "../contexts/ComicProvider";
import ComicDialog from "./Modals/ComicDialog";


const MarvelListItem = ({ comic, counter, bg, arcIndex }) => {
    const { store } = useComics();


    const [checked, setChecked] = useState(comic.Read);
    const [open, setOpen] = useState(false);

    const { id } = useParams();

    const handleToggle = () => {
        setChecked(!checked);
        comic.Read = !checked;
        store(comic.Id, !checked, id.toLowerCase(), arcIndex);
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
                key={comic.Id}
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
                    <ListItemText primary={comic.SeriesName} />
                </ListItemButton>
            </ListItem>


            <ComicDialog open={open} handleClose={handleClose}
                onClick={() => setOpen(true)} handleToggle={handleToggle}
                comic={comic} checked={checked} />
        </>);
}

export default MarvelListItem;