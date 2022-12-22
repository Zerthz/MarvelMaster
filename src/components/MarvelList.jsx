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
import getReadComics from "../services/GetReadComics";
import TitleProgress from "./TitleProgress";

function MarvelList() {

    const { userData, dataExists, supportedLists, setDataExists } = useComics();
    const { currentUser } = useAuth();

    const [results, setResults] = useState();
    const [loading, setLoading] = useState(true);
    const [comicItems, setComicItems] = useState();
    const [ableToLoadMore, setAbleToLoadMore] = useState(true);

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
    const loadMore = () => {
        setLoading(true);
        let lastIndex = comicItems.length - 1;
        let all = [...userData[id.toLowerCase()]];
        let comicsLeft = Math.min(100, (all.length - lastIndex));

        let loaded = all.slice(0, (lastIndex + comicsLeft));
        createItems(loaded);
        if (loaded.length - 1 === all.length) {
            setAbleToLoadMore(false);
        }


    }


    useEffect(() => {
        try {
            setLoading(true);
            if (supportedLists[id.toLowerCase()].title) {
                let data = userData[id.toLowerCase()];
                if (data) {
                    setResults(data);
                    let read = getReadComics(data);
                    let foo = data.slice(read.length, (100 + read.length));
                    createItems(foo);
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
                            <TitleProgress />
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