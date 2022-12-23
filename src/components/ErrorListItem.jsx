import { Divider, ListItem, ListItemButton, ListItemText } from "@mui/material";

import React, { useState } from 'react';
import EditDialog from "./Modals/EditDialog";


const ErrorListItem = ({ comic, bg }) => {
    const [editOpen, setEditOpen] = useState(false);

    const handleEditClose = () => {
        setEditOpen(false);
    }
    return (
        <>
            <ListItem
                sx={{ background: bg }}
                disablePadding
                key={comic.Id}
            >
                <ListItemButton onClick={() => {
                    setEditOpen(true);
                }}>

                    <ListItemText primary={comic.SeriesName + ' #' + comic.Issue} />
                </ListItemButton>
            </ListItem>

            <Divider variant="inset" component="li" />

            <EditDialog open={editOpen} onClose={handleEditClose} comic={comic} onCancel={handleEditClose} />


        </>);
}

export default ErrorListItem;