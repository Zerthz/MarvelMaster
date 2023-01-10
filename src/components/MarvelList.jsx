import { List, Box, Button, Divider, Typography } from "@mui/material";
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
import ArcTitle from "./ArcHeader";
import Arc from "./Arc";

function MarvelList() {

    const { userData, dataExists, supportedLists, setDataExists } = useComics();
    const { currentUser } = useAuth();

    const [loading, setLoading] = useState(true);
    const [comicItems, setComicItems] = useState();
    const [loadedResults, setLoadedResults] = useState();
    const [ableToLoadMore, setAbleToLoadMore] = useState(true);
    const [loadedArcs, setLoadedArcs] = useState(1);
    const { id } = useParams();

    let navigate = useNavigate();



    let counter = 0;
    const createItems = (data) => {
        let listItems = data.map((arc) => {
            return (<Arc arc={arc} arcIndex={counter++} />);
        });
        setComicItems(listItems);
        setLoadedResults(listItems.slice(0, loadedArcs));
        // setLoadedArcs(1);
        if (listItems.length === 1) {
            setAbleToLoadMore(false);
        }
        setDataExists(true);
        setLoading(false);
    }
    const loadMore = () => {
        setLoading(true);

        let loaded = loadedArcs;
        let arr = [...comicItems];
        let load = arr.slice(0, loaded + 1);
        setLoadedResults(load);
        setLoadedArcs(loaded + 1);

        if ((loadedArcs + 1) === comicItems.length) {
            setAbleToLoadMore(false);
        }

        setLoading(false);
    }


    useEffect(() => {
        try {
            setLoading(true);
            if (supportedLists[id.toLowerCase()].title) {
                let data = userData[id.toLowerCase()];
                if (data) {
                    let read = getReadComics(data);
                    let foo = data.filter(x => !read.includes(x));
                    createItems(foo.slice(0, 100));
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
    }, [id, userData]);

    return (
        <>
            {!loading &&
                <Box
                    display="flex"
                    sx={{ flexDirection: 'column', alignItems: 'center', paddingTop: '2em', gap: '0.5em' }}>
                    {!currentUser && <SignUp />}
                    {dataExists && currentUser &&
                        <>
                            <TitleProgress />
                            <Divider />
                            <Box sx={{ width: { xs: '90%', lg: '25%' }, paddingTop: 0 }}>
                                {loadedResults}
                            </Box>
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