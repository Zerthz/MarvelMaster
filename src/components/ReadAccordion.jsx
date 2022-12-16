import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useComics } from '../contexts/ComicProvider';
import MarvelListItem from './MarvelListItem';
import { Accordion, AccordionDetails, AccordionSummary, List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const ReadAccordion = () => {
    const { results } = useComics();

    const [expanded, setExpanded] = useState(true);

    let readList = results.reduce((readList, comic) => {
        if (comic.read) {
            readList.push(comic);
        }
        return readList;
    }, [])

    let readListItems = readList.map(comic => {

        return (<MarvelListItem key={comic.id} bg={'lightgreen'} comic={comic} />);
    });

    const handleChange = () => {
        setExpanded(!expanded);
    }
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
                    {readListItems}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}

export default ReadAccordion;