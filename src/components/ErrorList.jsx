import { Checkbox, Divider, List, ListItem, ListItemButton, ListItemText, Modal, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MarvelMasterContext } from "../contexts/MasterProvider";
import ModalUnstyled from '@mui/base/ModalUnstyled';
import MarvelListItem from "./MarvelListItem";
import GetComicsPrompt from "./GetComicsPrompt";
import ErrorListItem from "./ErrorListItem";

function ErrorList() {

    const { errors } = useContext(MarvelMasterContext);


    let counter = 0;
    let listItems = errors.map(item => {
        counter = counter + 1;
        let bg = '#3f51b5';
        if (counter % 2 === 0) {
            bg = 'secondary'
        }
        return (
            <>
                <ErrorListItem key={item.id} bg={bg} counter={counter} comic={item} />
            </>
        )

    });

    return (
        <>
            <Box
                display="flex"
                justifyContent="center">
                {errors.length > 0 ?
                    <List sx={{ width: '25%' }}>
                        {listItems}
                    </List>
                    :
                    <Typography>
                        Luckily there are no errors! :)
                    </Typography>
                }
            </Box>

        </>
    );
}

export default ErrorList;