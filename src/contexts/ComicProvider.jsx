import dayjs from 'dayjs';
import { createContext, useContext, useEffect, useState } from 'react';
import getReadComics from '../services/GetReadComics';
import lessThanOneHourAgo from '../services/LessThanOneHourAgo';
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
    const [readResults, setReadResults] = useState([]);
    const [errors, setErrors] = useState([]);
    const [ableToLoadMore, setAbleToLoadMore] = useState(true);
    const [dataExists, setDataExists] = useState(false);
    const [userData, setUserData] = useState({});

    const [loading, setLoading] = useState(false);


    let supportedLists = {
        part1: 'Marvel Master Part 1',
        jhtms: 'Jonathan Hickman: The Marvel Saga',
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

        // let newArr = [...allResults];


        // setAllResults(newArr);
        // setResults(newArr.slice(0, results.length));
        // // if there are errors existing, check if this existed in the errors too.
        // if (errors.length > 0) {
        //     if (removeError(id, newArr)) {
        //         return;
        //     }

        // }
        // // updateCache(newArr, 'Part1');
        // setData({ results: newArr, missingItems: errors });

    }

    const loadMore = () => {
        let lastIndex = results.length - 1;
        let all = [...allResults];
        let comicsLeft = Math.min(100, (all.length - lastIndex));
        let loaded = all.slice(lastIndex, (lastIndex + comicsLeft));

        let newArr = [...results, ...loaded];
        setResults(newArr);
        if (newArr.length - 1 === all.length) {
            setAbleToLoadMore(false);
        }
    }

    const fetchComics = () => {
        let url = "https://localhost:7284/api/MarvelMaster/Part1";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('readComics', JSON.stringify(data.result))
                localStorage.setItem('missingItems', JSON.stringify(data.missingItems));
                setResults(data.result);
                setErrors(data.missingItems);
            });
        // setCacheExists(true);
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
        //     let userContent = localStorage.getItem(currentUser.uid);

        //     if (!userContent) {
        //         try {
        //             let comics = await getFromDb();
        //             createCache(comics.results, comics.missingItems);

        //         } catch {
        //             // No Cache and we can't retrieve data from the database
        //             // Create new data

        //             setCacheExists(false);
        //         }
        //     }
        //     else {
        //         let content = JSON.parse(userContent);
        //         // old content saved in cache
        //         if (lessThanOneHourAgo(content.timeSaved) === false) {
        //             try {
        //                 // want to compare read in db vs read in cache.
        //                 let comics = await getFromDb();
        //                 let x = comics.results;
        //                 let read = getReadComics(x);
        //                 let cacheRead = getReadComics(content.results.part1);

        //                 // if more read in cache we use cache instead of db
        //                 if (cacheRead.length > read.length) {
        //                     setAllResults(content.results.part1);
        //                     setReadResults(cacheRead);
        //                     setResults(content.results.part1.slice(0, 100));
        //                     setErrors(content.missingItems);
        //                     setCacheExists(true);
        //                     updateCache({}, 'timestamp');
        //                 }
        //                 // we decide to use db content anyways
        //                 else {
        //                     createCache(comics.results, comics.missingItems);
        //                 }


        //             } catch (error) {
        //                 // fail to get comics from db, should be a weird edge case
        //                 setCacheExists(false);
        //                 console.log(error);
        //             }
        //         }
        //         else {
        //             setAllResults(content.results.part1);
        //             setReadResults(getReadComics(content.results.part1));
        //             setResults(content.results.part1.slice(0, 100));
        //             setErrors(content.missingItems);
        //             setCacheExists(true);
        //         }
        //     }

        // }
        getComics();

    }, [currentUser]);
    return (
        <ComicContext.Provider
            value={{
                results, dataExists, fetchComics, store, updateComic, errors, removeComic, allResults, supportedLists,
                ableToLoadMore, loadMore, readResults, userData, setDataExists
            }}
        >
            {!loading && props.children}
        </ComicContext.Provider>
    )
}

export default ComicProvider;