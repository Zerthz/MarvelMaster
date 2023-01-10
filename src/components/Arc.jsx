import { Button, Collapse, Divider, IconButton, List } from "@mui/material";
import { useEffect, useState } from "react";
import { useComics } from "../contexts/ComicProvider";
import ArcSubheader from "./ArcSubheader";
import MarvelListItem from "./MarvelListItem";
import ReadAccordion from "./ReadAccordion";
import ArcHeader from "./ArcHeader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { MoreHoriz } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const Arc = ({ arc, arcIndex }) => {
    const [comicItems, setComicItems] = useState();
    const { userData } = useComics();
    const { id } = useParams();

    const [expanded, setExpanded] = useState(true);
    const [arcExpanded, setArcExpanded] = useState(true);
    const handleExpand = () => {
        setExpanded(!expanded);
    }
    const handleArcExpand = () => {
        setArcExpanded(!arcExpanded);
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

        setExpanded(true);
        setArcExpanded(true);


    }, [id])



    return (
        <>
            <IconButton sx={{ display: 'flex', marginLeft: 'auto', opacity: '0.1' }} onClick={handleArcExpand}>
                {arcExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
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
        </>
    );
}

export default Arc;