import { Checkbox, Divider, List, ListItem, ListItemButton, ListItemText, Modal, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MarvelMasterContext } from "../contexts/MasterProvider";
import ModalUnstyled from '@mui/base/ModalUnstyled';
import MarvelListItem from "./MarvelListItem";
import GetComicsPrompt from "./GetComicsPrompt";

function MarvelList() {

    const { results, cacheExists } = useContext(MarvelMasterContext);


    let counter = 0;
    let listItems = results.map(item => {
        counter = counter + 1;
        let bg = '#3f51b5';
        if (counter % 2 === 0) {
            bg = 'secondary'
        }
        return (
            <>
                <MarvelListItem key={item.id} bg={bg} counter={counter} comic={item} />
            </>
        )

    });

    return (
        <>
            <Box
                display="flex"
                justifyContent="center">
                {cacheExists ?
                    <List sx={{ width: '25%' }}>
                        {listItems}
                    </List>
                    : <GetComicsPrompt />
                }
            </Box>

        </>
    );
}

export default MarvelList;