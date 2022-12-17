import { createContext, useContext, useEffect, useState } from 'react';

export const ComicContext = createContext();

export const useComics = () => {
    return useContext(ComicContext);
}

const ComicProvider = (props) => {
    const [results, setResults] = useState([]);
    const [allResults, setAllResults] = useState([]);
    const [errors, setErrors] = useState([]);
    const [cacheExists, setCacheExists] = useState();
    const [ableToLoadMore, setAbleToLoadMore] = useState(true);

    const updateCache = (resultToSave, missingItemsToSave) => {
        localStorage.setItem('readComics', JSON.stringify(resultToSave));
        localStorage.setItem('missingItems', JSON.stringify(missingItemsToSave));

        setAllResults(resultToSave);
        setResults(resultToSave.slice(0, 100));
        setErrors(missingItemsToSave);
        setCacheExists(true);
    }

    const store = (id, read) => {
        let newArr = [...allResults];
        let toUpdate = newArr.find(comic => comic.id === id);
        toUpdate.read = read;
        setAllResults(newArr);
        setResults(newArr.slice(0, results.length));

        localStorage.setItem('readComics', JSON.stringify(newArr))
    }

    const removeComic = (id) => {
        let newArr = [...results];
        let toRemove = newArr.findIndex(comic => comic.id === id);
        newArr.slice(toRemove, 1);
        setResults(newArr);
        if (errors.length > 0) {
            let errorArr = [...errors];
            let errorUpdate = errorArr.findIndex(comic => comic.id === id);
            if (errorUpdate > -1) {
                errorArr.splice(errorUpdate, 1);
                setErrors(errorArr);
                localStorage.setItem('missingItems', JSON.stringify(errorArr))

            }
        }
        localStorage.setItem('readComics', JSON.stringify(newArr))

    }

    const updateComic = (id, title, url, img, description, comment) => {
        let newArr = [...allResults];
        let toUpdate = newArr.find(comic => comic.id === id);
        toUpdate.seriesName = title;
        toUpdate.detailUrl = url;
        toUpdate.imageUrl = img;
        toUpdate.description = description;
        toUpdate.comment = comment;

        setAllResults(newArr);
        setResults(newArr.slice(0, results.length));
        // if there are errors existing, check if this existed in the errors too.
        if (errors.length > 0) {
            let errorArr = [...errors];
            let errorUpdate = errorArr.findIndex(comic => comic.id === id);
            if (errorUpdate > -1) {
                errorArr.slice(errorUpdate, 1);
                setErrors(errorArr);
                localStorage.setItem('missingItems', JSON.stringify(errorArr))

            }

        }
        localStorage.setItem('readComics', JSON.stringify(newArr))
    }

    const loadMore = () => {
        let lastIndex = results.length - 1;
        let all = [...allResults];
        let foo = Math.min(100, (all.length - lastIndex));
        let loaded = all.slice(lastIndex, (lastIndex + foo));

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
        setCacheExists(true);
    }



    useEffect(() => {
        let cached = localStorage.getItem('readComics');
        let cachedError = localStorage.getItem('missingItems');
        if (cached) {
            let cache = JSON.parse(cached);
            setAllResults(cache);
            setResults(cache.slice(0, 100));
            setCacheExists(true);
        } else {
            setCacheExists(false);
        }
        if (cachedError) {
            let cache = JSON.parse(cachedError)
            setErrors(cache)
        }

    }, []);
    return (
        <ComicContext.Provider
            value={{
                results, cacheExists, fetchComics, store, updateComic, errors, removeComic, allResults, updateCache,
                ableToLoadMore, loadMore,
            }}
        >
            {props.children}
        </ComicContext.Provider>
    )
}

export default ComicProvider;