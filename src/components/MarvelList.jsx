import { List, Box, Button, Divider, Typography, Grid, Chip } from "@mui/material";
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
import { Link as BrowserLink } from 'react-router-dom';
import OtherReading from "./PreviousReading";
import PreviousReading from "./PreviousReading";
import NextReading from "./NextReading";
import getComicsLength, { getReadComicsLength } from "../services/GetComicsLength";
import { useSettings } from "../contexts/SettingsProvider";

function MarvelList() {

    const { userData, dataExists, supportedLists, setDataExists } = useComics();
    const { currentUser } = useAuth();
    const { showPriorNext } = useSettings();

    const [loading, setLoading] = useState(true);
    const [comicItems, setComicItems] = useState();
    const [loadedResults, setLoadedResults] = useState();
    const [ableToLoadMore, setAbleToLoadMore] = useState(true);
    const [loadedArcs, setLoadedArcs] = useState(1);
    const { id } = useParams();

    let navigate = useNavigate();



    let counter = 0;
    const createItems = (data) => {
        let fullyReadArcs = 0;

        let listItems = data.map((arc) => {
            // if an arc is fully read we want to minimize it and load another one instead.
            let c = getComicsLength(arc)
            let r = getReadComicsLength(arc)
            if (r === c) {
                fullyReadArcs++;
                return (<Arc arc={arc} arcIndex={counter++} minimized={true} />);

            } else {
                return (<Arc arc={arc} arcIndex={counter++} minimized={false} />);
            }
        });
        setComicItems(listItems);
        let maxVal = Math.max(1, fullyReadArcs + 1);
        setLoadedResults(listItems.slice(0, maxVal));
        setLoadedArcs(maxVal);

        listItems.length === maxVal ? setAbleToLoadMore(false) : setAbleToLoadMore(true);
        setDataExists(true);
        setLoading(false);
    }
    const loadMore = () => {
        setLoading(true);

        let loaded = loadedResults.length;
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

    useEffect(() => {
        setLoadedArcs(1);
    }, [id])


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
                            {(showPriorNext && supportedLists[id.toLowerCase()].previousReading) && <PreviousReading text="Prior Reading" />}
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
                    {dataExists && !ableToLoadMore &&
                        <>
                            <Chip label="End" variant="outlined" />
                            {(showPriorNext && supportedLists[id.toLowerCase()].nextReading) && <NextReading text="Read This Next" />}
                        </>}
                    <ScrollTopFab />
                </Box>
            }
        </>
    );
}

export default MarvelList;