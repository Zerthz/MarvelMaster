import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { useRepo } from './RepoProvider';

export const ComicContext = createContext();

export const useComics = () => {
    return useContext(ComicContext);
}

const ComicProvider = (props) => {

    const { getUserData, setData } = useRepo();
    const { currentUser } = useAuth();

    const [results, setResults] = useState([]);
    const [allResults, setAllResults] = useState([]);
    const [errors, setErrors] = useState([]);
    const [dataExists, setDataExists] = useState(false);
    const [userData, setUserData] = useState({});

    const [loading, setLoading] = useState(false);


    let supportedLists = {
        part1: {
            title: 'Marvel Master Part 1',
            description: "Containing by far the most first appearances of significant characters of any Marvel era. You will see how the biggest superheroes in the Marvel Universe received their superpowers and witness the foundation that decades of comics will be built on. Witness the formation of the X-Men, Fantastic Four, and Avengers. Like most Silver Age comics there are numerous guest appearances but few actual crossovers. The beginning of the reading order features numerous limited series that take place chronologically before, as well as during, the earliest published Marvel comics."
        },
        jhtms: {
            title: 'Jonathan Hickman: The Marvel Saga',
            description: "Jonathan Hickman's work in the Marvel 616 universe all in one list, put together by users over at reddit"
        },
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

    const removeError = (id, allComics) => {
        let errorArr = [...errors];
        let errorUpdate = errorArr.findIndex(comic => comic.id === id);
        if (errorUpdate > -1) {
            errorArr.splice(errorUpdate, 1);
            setErrors(errorArr);
            // updateCache({ results: { part1: allComics }, missingItems: errorArr }, 'all');
            setData({ results: allComics, missingItems: errorArr });
            return true;
        }
        return false;
    }

    const store = (id, read, page) => {
        let all = { ...userData };
        let field = all[page];
        let toUpdate = field.find(comic => comic.id === id);
        toUpdate.read = read;
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
            let errorUpdate = errorArr.findIndex(comic => comic.id === id);
            if (errorUpdate > -1) {
                if (removeError(id, newArr)) {
                    return;
                }
            }

        }

        // updateCache(newArr, 'Part1');
        setData({ results: newArr, missingItems: errors });

    }

    const updateComic = (id, title, url, img, description, comment, page) => {

        let all = { ...userData };
        let field = all[page];
        let toUpdate = field.find(comic => comic.id === id);
        toUpdate.seriesName = title;
        toUpdate.detailUrl = url;
        toUpdate.imageUrl = img;
        toUpdate.description = description;
        toUpdate.comment = comment;

        if (all.errors.length > 0) {
            let errorArr = [...all.errors];
            let errorUpdate = errorArr.findIndex(comic => comic.id === id);
            if (errorUpdate > -1) {
                errorArr.splice(errorUpdate, 1);
                all.errors = errorArr;
            }
        }

        setUserData(all);
        setData(all);
    }

    // const loadMore = () => {
    //     let lastIndex = results.length - 1;
    //     let all = [...allResults];
    //     let comicsLeft = Math.min(100, (all.length - lastIndex));
    //     let loaded = all.slice(lastIndex, (lastIndex + comicsLeft));

    //     let newArr = [...results, ...loaded];
    //     setResults(newArr);
    //     if (newArr.length - 1 === all.length) {
    //         setAbleToLoadMore(false);
    //     }
    // }

    const fetchComics = (id) => {
        setLoading(true);
        let param;
        switch (id.toLowerCase()) {
            case 'part1':
                param = 'MMPart1';
                break;
            case 'jhtms':
                param = 'JHTMS';
                break;
            default:
                return;
        }


        let url = "https://localhost:7284/api/MarvelMaster/" + param;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    let all = { ...userData };

                    switch (id.toLowerCase()) {
                        case 'part1':
                            all.part1 = data.result;
                            all.errors = data.missingItems;
                            break;
                        case 'jhtms':
                            all.jhtms = data.result;
                            break;
                        default:
                            return;
                    }
                    setUserData(all);
                    setData(all);
                }



                setLoading(false);
            });
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
                userData, setDataExists
            }}
        >
            {!loading && props.children}
        </ComicContext.Provider>
    )
}

export default ComicProvider;