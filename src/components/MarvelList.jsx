import { List, Box, Button, Divider } from "@mui/material";
import { useComics } from "../contexts/ComicProvider";
import MarvelListItem from "./MarvelListItem";
import GetComicsPrompt from "./GetComicsPrompt";
import { useAuth } from "../contexts/AuthProvider";
import SignUp from "./auth/SignUp";
import ReadAccordion from "./ReadAccordion";
import ScrollTopFab from "./ScrollTopFab";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MarvelList() {

    const { userData, dataExists, ableToLoadMore, loadMore, supportedLists, setDataExists } = useComics();
    const { currentUser } = useAuth();

    const [results, setResults] = useState();
    const [loading, setLoading] = useState(true);
    const [comicItems, setComicItems] = useState();

    const { id } = useParams();

    let navigate = useNavigate();
    let counter = 0;


    const createItems = (data) => {
        let listItems = data.map(item => {
            if (item.read === true) { return; }

            counter = counter + 1;
            let bg = '#3f51b5';
            if (counter % 2 === 0) {
                bg = 'secondary'
            }
            return (
                <MarvelListItem key={item.id} bg={bg} counter={counter} comic={item} />
            )

        });

        setComicItems(listItems);
        setDataExists(true);
        setLoading(false);

    }


    useEffect(() => {
        try {
            setLoading(true);
            if (supportedLists[id.toLowerCase()]) {
                let data = userData[id.toLowerCase()];
                if (data) {
                    setResults(data);
                    createItems(data.slice(0, 100));
                }
                else {
                    // This user doesn't have this supported data
                    setDataExists(false);
                    setLoading(false);
                }
            } else {

                navigate("/NotFound");

            }


        } catch (error) {
            console.log(error);
        }
        finally {
        }
    }, [id, userData]);

    return (
        <>
            {!loading &&
                <Box
                    display="flex"
                    sx={{ flexDirection: 'column', alignItems: 'center', paddingTop: '2em' }}>
                    {!currentUser && <SignUp />}
                    {dataExists && currentUser &&
                        <>
                            {id}

                            <ReadAccordion data={results} />
                            <Divider />
                            <List sx={{ width: { xs: '90%', lg: '25%' }, paddingTop: 0 }}>
                                {comicItems}
                            </List>
                        </>
                    }
                    {!dataExists && currentUser && <GetComicsPrompt />}
                    {dataExists && ableToLoadMore &&
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
            }
        </>
    );
}

export default MarvelList;