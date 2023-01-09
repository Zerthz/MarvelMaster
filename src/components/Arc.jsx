import { Button, Collapse, Divider, IconButton, List } from "@mui/material";
import { useEffect, useState } from "react";
import { useComics } from "../contexts/ComicProvider";
import ArcSubheader from "./ArcSubheader";
import ArcTitle from "./ArcHeader";
import MarvelListItem from "./MarvelListItem";
import ReadAccordion from "./ReadAccordion";
import ArcHeader from "./ArcHeader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Arc = ({ arc, arcIndex }) => {
    const [comicItems, setComicItems] = useState();
    const { userData } = useComics();

    const [expanded, setExpanded] = useState(true);
    const handleExpand = () => {
        setExpanded(!expanded);
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





    return (
        <>
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
        </>
    );
}

export default Arc;