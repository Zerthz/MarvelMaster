import { List } from "@mui/material";
import { useEffect, useState } from "react";
import { useComics } from "../contexts/ComicProvider";
import ArcSubheader from "./ArcSubheader";
import ArcTitle from "./ArcHeader";
import MarvelListItem from "./MarvelListItem";
import ReadAccordion from "./ReadAccordion";
import ArcHeader from "./ArcHeader";

const Arc = ({ arc, arcIndex }) => {
    const [comicItems, setComicItems] = useState();
    const { userData } = useComics();



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
            <ReadAccordion data={arc.ArcParts} arcIndex={arcIndex} />
            <List>
                {comicItems}
            </List>
        </>
    );
}

export default Arc;