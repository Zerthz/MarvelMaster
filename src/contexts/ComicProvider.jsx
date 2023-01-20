import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { useRepo } from './RepoProvider';

export const ComicContext = createContext();

export const useComics = () => {
    return useContext(ComicContext);
}

const ComicProvider = (props) => {

    const { getUserData, setData, getComics } = useRepo();
    const { currentUser } = useAuth();

    const [results, setResults] = useState([]);
    const [allResults, setAllResults] = useState([]);
    const [errors, setErrors] = useState([]);
    const [dataExists, setDataExists] = useState(false);
    const [userData, setUserData] = useState({});

    const [loading, setLoading] = useState(false);


    let supportedLists = {
        // part1: {
        //     title: 'Marvel Master Part 1',
        //     description: "Containing by far the most first appearances of significant characters of any Marvel era. You will see how the biggest superheroes in the Marvel Universe received their superpowers and witness the foundation that decades of comics will be built on. Witness the formation of the X-Men, Fantastic Four, and Avengers. Like most Silver Age comics there are numerous guest appearances but few actual crossovers. The beginning of the reading order features numerous limited series that take place chronologically before, as well as during, the earliest published Marvel comics."
        // },
        jhtms: {
            title: 'Jonathan Hickman: The Marvel Saga',
            description: "Jonathan Hickman's work in the Marvel 616 universe all in one list, put together by users over at reddit"
        },
        xmen: {
            title: 'X-Men',
            description: "A decade worth of X-Men comics",
            previousReading: {
                name: 'xmendays',
                url: 'https://i.imgur.com/bAzwGUw.png'
            }
        },
        pheonixsaga: {
            title: 'Pheonix Saga',
            description: "Telepath Jean Grey has gained power beyond all comprehension, and that power has corrupted her absolutely! Now the X-Men must decide if the life of the woman they cherish is worth the existence of the entire universe!",
            nextReading: {
                name: 'xmendays',
                url: 'https://i.imgur.com/bAzwGUw.png'
            }
        },
        xmendays: {
            title: 'X-Men: Days of Future Past',
            description: 'The year 2013 teeters on the brink of Armageddon. Sentinels, whose destructive paths have now reached humanity, imprison and exterminate mutants at will. Although teen Kitty Pryde is a newbie to the team, it’s up to the X-Men’s youngest member to relay a message from her future…to prevent a catalyzing event in the X-Men’s present.',
            previousReading: {
                name: 'pheonixsaga',
                url: 'https://i.imgur.com/7kk64iF.png'
            },
            nextReading: {
                name: 'xmen',
                url: 'https://i.imgur.com/qIpKDp0.png'
            }
        },
        annhilation: {
            title: 'Annhilation',
            description: "The start of the modern era of Marvel cosmic. Orchestrated by Dan Abnett and Andy Lanning, this era introduces the actual Guardians of the Galaxy and the reinvention of Nova along with political intrigues, massive space battles and end of the universe type of events, all of this into one gigantic and coherent storyline. Side stories includes the rise of the Inhumans and the Silver Surfer as the herald of Galactus."
        }
    };




    // const createCache = (resultToSave, missingItemsToSave) => {

    //     let data = {
    //         timeSaved: dayjs(),
    //         results: {
    //             part1: resultToSave,
    //         },
    //         missingItems: missingItemsToSave,
    //     };

    //     setAllResults(resultToSave);
    //     setReadResults(getReadComics(resultToSave));
    //     setResults(resultToSave.slice(0, 100));
    //     setErrors(missingItemsToSave);
    //     localStorage.setItem(currentUser.uid, JSON.stringify(data));
    //     // setCacheExists(true);
    // }

    // const updateCache = (data, toUpdate) => {
    //     let cacheJSON = localStorage.getItem(currentUser.uid);
    //     let cache = JSON.parse(cacheJSON);
    //     cache.timeSaved = dayjs();
    //     switch (toUpdate) {
    //         case 'Part1':
    //             cache.results.part1 = data;
    //             break;
    //         case 'missingItems':
    //             cache.missingItems = data;
    //             break;
    //         // update all
    //         case 'all':
    //             cache.results = data.results;
    //             cache.missingItems = data.missingItems;
    //             break;
    //         // this allows us to enter here with only changing the timestamp
    //         case 'timestamp':
    //             break;
    //         default:
    //             return;
    //     };

    //     localStorage.setItem(currentUser.uid, JSON.stringify(cache));
    //     // setCacheExists(true);
    // }

    const updateRating = (page, comic, arc, rating) => {
        let all = { ...userData };
        let field = all[page];
        let toUpdate = field[arc].ArcParts.find(c => c.Id === comic.Id);
        toUpdate.Rating = rating;

        setUserData(all);
        setData(all);
    }

    const updateLiked = (page, comic, arc, liked) => {
        let all = { ...userData };
        let field = all[page];
        let toUpdate = field[arc].ArcParts.find(c => c.Id === comic.Id);
        toUpdate.Liked = liked;

        setUserData(all);
        setData(all);
    }

    const removeError = (id, allComics) => {
        let errorArr = [...errors];
        let errorUpdate = errorArr.findIndex(comic => comic.Id === id);
        if (errorUpdate > -1) {
            errorArr.splice(errorUpdate, 1);
            setErrors(errorArr);
            // updateCache({ results: { part1: allComics }, missingItems: errorArr }, 'all');
            setData({ results: allComics, missingItems: errorArr });
            return true;
        }
        return false;
    }

    const store = (id, read, page, arcIndex) => {
        let all = { ...userData };
        let field = all[page];
        let toUpdate = field[arcIndex].ArcParts.find(comic => comic.Id === id);
        toUpdate.Read = read;
        setUserData(all);
        setData(all);
    }

    const removeComic = (id) => {
        let newArr = [...allResults];
        let toRemove = newArr.findIndex(comic => comic.id === id);
        newArr.splice(toRemove, 1);
        setAllResults(newArr);
        setResults(newArr.slice(0, 100));
        if (errors.length > 0) {
            let errorArr = [...errors];
            let errorUpdate = errorArr.findIndex(comic => comic.Id === id);
            if (errorUpdate > -1) {
                if (removeError(id, newArr)) {
                    return;
                }
            }

        }

        // updateCache(newArr, 'Part1');
        setData({ results: newArr, missingItems: errors });

    }

    const updateComic = (id, title, url, img, description, comment, page, arc) => {

        let all = { ...userData };
        let field = all[page];
        let toUpdate = field[arc].ArcParts.find(comic => comic.Id === id);
        toUpdate.SeriesName = title;
        toUpdate.DetailUrl = url;
        toUpdate.ImageUrl = img;
        toUpdate.Description = description;
        toUpdate.Comment = comment;

        if (all.errors.length > 0) {
            let errorArr = [...all.errors];
            let errorUpdate = errorArr.findIndex(comic => comic.Id === id);
            if (errorUpdate > -1) {
                errorArr.splice(errorUpdate, 1);
                all.errors = errorArr;
            }
        }

        setUserData(all);
        setData(all);
    }


    const fetchComics = async (id) => {
        setLoading(true);
        let param;
        switch (id.toLowerCase()) {
            case 'part1':
                param = 'MMPart1';
                break;
            case 'jhtms':
                param = 'JHTMS';
                break;
            case 'annhilation':
                param = 'COSANN'
                break;
            case 'xmen':
                param = "MXMEN"
                break;
            case 'pheonixsaga':
                param = "PHSAGA"
                break;
            case 'xmendays':
                param = "DOFP"
                break;
            default:
                return;
        }

        let comics = await getComics(param);
        if (comics) {
            let all = { ...userData };

            switch (id.toLowerCase()) {
                case 'part1':
                    all.part1 = comics.Result;
                    all.errors = comics.MissingItems;
                    break;
                case 'jhtms':
                    all.jhtms = comics.Result;
                    break;
                case 'annhilation':
                    all.annhilation = comics.Result;
                    break;
                case 'xmen':
                    all.xmen = comics.Result;
                    break;
                case 'pheonixsaga':
                    all.pheonixsaga = comics.Result;
                    break;
                case 'xmendays':
                    all.xmendays = comics.Result;
                    break;
                default:
                    return;
            }

            setUserData(all);
            setData(all);
            setLoading(false);
        }


        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data) {
        //             let all = { ...userData };

        //             switch (id.toLowerCase()) {
        //                 case 'part1':
        //                     all.part1 = data.result;
        //                     all.errors = data.missingItems;
        //                     break;
        //                 case 'jhtms':
        //                     all.jhtms = data.result;
        //                     break;
        //                 default:
        //                     return;
        //             }
        //             setUserData(all);
        //             setData(all);
        //         }



        //         setLoading(false);
        //     });
    }

    const getFromDb = async () => {
        let comics = await getUserData();
        return comics;
    }

    useEffect(() => {
        const getComics = async () => {
            setLoading(true);

            try {
                let userData = await getFromDb();

                setUserData(userData);
                setDataExists(true)

            } catch (error) {
                // no user data exists
                console.log(error);
                setDataExists(false);
            } finally {
                setLoading(false);
            }

        }

        getComics();

    }, [currentUser]);
    return (
        <ComicContext.Provider
            value={{
                results, dataExists, fetchComics, store, updateComic, errors, removeComic, allResults, supportedLists,
                userData, setDataExists, updateRating, updateLiked
            }}
        >
            {!loading && props.children}
        </ComicContext.Provider>
    )
}

export default ComicProvider;