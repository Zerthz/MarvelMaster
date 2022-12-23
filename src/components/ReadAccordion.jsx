import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useComics } from '../contexts/ComicProvider';
import MarvelListItem from './MarvelListItem';
import { Accordion, AccordionDetails, AccordionSummary, List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import getReadComics from '../services/GetReadComics';


export const ReadAccordion = ({ data }) => {
    const { userData } = useComics();

    const [expanded, setExpanded] = useState(true);
    const [readItems, setReadItems] = useState();


    const handleChange = () => {
        setExpanded(!expanded);
    }

    const createItems = (comics) => {
        let readListItems = comics.map(comic => {

            return (<MarvelListItem key={comic.Id} bg={'lightgreen'} comic={comic} />);
        });

        setReadItems(readListItems);
    }

    useEffect(() => {
        createItems(getReadComics(data));
    }, [data, userData])

    return (
        <Accordion sx={{ width: { xs: '90%', lg: '25%' } }} expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"

            >
                <Typography>Read Comics</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
                <List>
                    {readItems}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}

export default ReadAccordion;