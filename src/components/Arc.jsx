import { Collapse, Divider, IconButton, List, Menu, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useComics } from "../contexts/ComicProvider";
import ArcSubheader from "./ArcSubheader";
import MarvelListItem from "./MarvelListItem";
import ReadAccordion from "./ReadAccordion";
import ArcHeader from "./ArcHeader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useParams } from "react-router-dom";
import { Stack } from "@mui/system";
import getComicsLength, { getReadComicsLength } from "../services/GetComicsLength";
import DoneIcon from '@mui/icons-material/Done';
import { MoreHoriz } from "@mui/icons-material";

const Arc = ({ arc, arcIndex, minimized }) => {
    const [comicItems, setComicItems] = useState();
    const { userData, markArcAsRead, markArcAsUnread } = useComics();
    const { id } = useParams();


    const [expanded, setExpanded] = useState(true);
    const [arcExpanded, setArcExpanded] = useState(true);
    const [fullyRead, setFullyRead] = useState(false);
    const [anchorElOptions, setAnchorElOptions] = useState(null);


    const handleExpand = () => {
        setExpanded(!expanded);
    }
    const handleArcExpand = () => {
        setArcExpanded(!arcExpanded);
    }

    const handleCloseOptions = () => {
        setAnchorElOptions(null);
    }

    const handleOptionsMenu = (event) => {
        setAnchorElOptions(event.currentTarget);
    }

    const handleMarkAsRead = () => {
        handleCloseOptions();
        markArcAsRead(id, arcIndex);
    }
    const handleMarkAsUnread = () => {
        handleCloseOptions();
        markArcAsUnread(id, arcIndex);
    }


    useEffect(() => {

        let counter = 0;
        let listItems = arc.ArcParts.map(item => {
            if (item.Read === true) { return; }
            if (item.IsComic === false) {
                return <ArcSubheader title={item.Title} description={item.Description} />
            }
            counter = counter + 1;
            let bg = '#3f51b5';
            if (counter % 2 === 0) {
                bg = 'secondary'
            }
            return (
                <MarvelListItem key={item.Id} bg={bg} counter={counter} comic={item} arcIndex={arcIndex} />
            )

        });
        setComicItems(listItems);
    }, [arc, userData])

    useEffect(() => {
        if (getComicsLength(arc) === getReadComicsLength(arc)) {
            setFullyRead(true);
        }
        else {
            setFullyRead(false);
        }
        setExpanded(true);
        if (minimized) {
            setArcExpanded(false);
        }
        else {
            setArcExpanded(true);
        }

    }, [id, minimized])



    return (
        <>
            <Stack direction="row">
                {!arcExpanded &&
                    <Typography variant="subtitle1" sx={{ fontStyle: 'italic', alignSelf: 'center' }}>
                        {arc.Title}{fullyRead && <DoneIcon fontSize="small" />}
                    </Typography>}
                <Stack direction="row" sx={{ display: 'flex', marginLeft: 'auto', opacity: '0.1' }}>
                    <IconButton onClick={handleOptionsMenu}>
                        <MoreHoriz />
                    </IconButton>
                    <IconButton onClick={handleArcExpand}>
                        {arcExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Stack>
            </Stack>
            <Collapse in={arcExpanded}>
                <ArcHeader title={arc.Title} description={arc.Description} image={arc.ImageUrl} />
                <Divider sx={{ marginBottom: '0.5em' }}>
                    <IconButton onClick={handleExpand}>
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Divider>
                <Collapse in={expanded}>
                    <ReadAccordion data={arc.ArcParts} arcIndex={arcIndex} />
                    <List>
                        {comicItems}
                    </List>
                </Collapse>
            </Collapse>
            {!arcExpanded && <Divider variant="middle" />}
            <Menu
                anchorEl={anchorElOptions}
                keepMounted
                open={Boolean(anchorElOptions)}
                onClose={handleCloseOptions}
            >
                <MenuItem onClick={handleMarkAsRead} disabled={fullyRead}>
                    Mark As Read
                </MenuItem>
                <MenuItem onClick={handleMarkAsUnread} disabled={!fullyRead}>
                    Mark As Unread
                </MenuItem>

            </Menu>
        </>
    );
}

export default Arc;