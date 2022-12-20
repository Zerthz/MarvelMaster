import { List, Box, Button, Divider } from "@mui/material";
import { useComics } from "../contexts/ComicProvider";
import MarvelListItem from "./MarvelListItem";
import GetComicsPrompt from "./GetComicsPrompt";
import { useAuth } from "../contexts/AuthProvider";
import SignUp from "./auth/SignUp";
import ReadAccordion from "./ReadAccordion";
import ScrollTopFab from "./ScrollTopFab";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MarvelList() {

    const { userData, dataExists, ableToLoadMore, loadMore, supportedLists } = useComics();
    const { currentUser } = useAuth();

    const [results, setResults] = useState();
    const [loading, setLoading] = useState(true);
    const [comicItems, setComicItems] = useState();

    const { id } = useParams();

    let navigate = useNavigate();
    let counter = 0;


    const createItems = (data) => {
        let listItems = data.map(item => {
            if (item.read !== true) {

                counter = counter + 1;
                let bg = '#3f51b5';
                if (counter % 2 === 0) {
                    bg = 'secondary'
                }
                return (
                    <MarvelListItem key={item.id} bg={bg} counter={counter} comic={item} />
                )
            }
        });

        setComicItems(listItems);
        setLoading(false);

    }


    useEffect(() => {
        try {
            setLoading(true);
            if (supportedLists[id.toLowerCase()]) {
                let data = userData[id.toLowerCase()];
                setResults(data);
                createItems(data.slice(0, 100));
            } else {

                navigate("/NotFound");

            }


        } catch (error) {
            console.log(error);
        }
        finally {
        }
    }, [id]);

    return (
        <Box
            display="flex"
            sx={{ flexDirection: 'column', alignItems: 'center', paddingTop: '2em' }}>
            {!currentUser && <SignUp />}
            {dataExists && currentUser &&
                <>
                    {id}
                    <ReadAccordion />
                    <Divider />
                    <List sx={{ width: { xs: '90%', lg: '25%' }, paddingTop: 0 }}>
                        {comicItems}
                    </List>
                </>
            }
            {!dataExists && currentUser && <GetComicsPrompt />}
            {ableToLoadMore &&
                <Button
                    variant="contained"
                    size="large"
                    color="info"
                    onClick={loadMore}
                    sx={{ marginBottom: '1em', width: { xs: '90%', lg: '25%' } }}>
                    Load More
                </Button>}

            <ScrollTopFab />
        </Box>

    );
}

export default MarvelList;