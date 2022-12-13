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
    const [errorCount, setErrorCount] = useState(0);

    const updateCache = (resultToSave, missingItemsToSave) => {
        localStorage.setItem('readComics', JSON.stringify(resultToSave));
        localStorage.setItem('missingItems', JSON.stringify(missingItemsToSave));

        setAllResults(resultToSave);
        setResults(resultToSave.slice(0, 100));
        setErrors(missingItemsToSave);
        setErrorCount(missingItemsToSave.length);
        setCacheExists(true);
    }

    const store = (id, read) => {
        let newArr = [...results];
        let toUpdate = newArr.find(comic => comic.id === id);
        toUpdate.read = read;
        setResults(newArr);
        localStorage.setItem('readComics', JSON.stringify(newArr))
    }

    const removeComic = (id) => {
        let newArr = [...results];
        let toRemove = newArr.findIndex(comic => comic.id === id);
        newArr.splice(toRemove, 1);
        setResults(newArr);
        if (errors.length > 0) {
            let errorArr = [...errors];
            let errorUpdate = errorArr.findIndex(comic => comic.id === id);
            if (errorUpdate > -1) {
                errorArr.splice(errorUpdate, 1);
                setErrors(errorArr);
                setErrorCount(errorArr.length);
                localStorage.setItem('missingItems', JSON.stringify(errorArr))

            }
        }
        localStorage.setItem('readComics', JSON.stringify(newArr))

    }

    const updateComic = (id, title, url, img, description) => {
        let newArr = [...results];
        let toUpdate = newArr.find(comic => comic.id === id);
        toUpdate.seriesName = title;
        toUpdate.detailUrl = url;
        toUpdate.imageUrl = img;
        toUpdate.description = description;
        setResults(newArr);

        // if there are errors existing, check if this existed in the errors too.
        if (errors.length > 0) {
            let errorArr = [...errors];
            let errorUpdate = errorArr.findIndex(comic => comic.id === id);
            if (errorUpdate > -1) {
                errorArr.splice(errorUpdate, 1);
                setErrors(errorArr);
                setErrorCount(errorArr.length);
                localStorage.setItem('missingItems', JSON.stringify(errorArr))

            }

        }
        localStorage.setItem('readComics', JSON.stringify(newArr))
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
                setErrorCount(data.missingItems.length);



            });

        setCacheExists(true);
    }



    useEffect(() => {
        let cached = localStorage.getItem('readComics');
        let cachedError = localStorage.getItem('missingItems');
        if (cached) {
            let cache = JSON.parse(cached);
            setResults(cache.slice(0, 100));
            setAllResults(cache);
            setCacheExists(true);


        } else {
            setCacheExists(false);
        }
        if (cachedError) {
            let cache = JSON.parse(cachedError)
            setErrors(cache)
            setErrorCount(cache.length);
        }

    }, []);
    return (
        <ComicContext.Provider
            value={{
                results, cacheExists, fetchComics, store, updateComic, errors, removeComic, errorCount, allResults, updateCache
            }}
        >
            {props.children}
        </ComicContext.Provider>
    )
}

export default ComicProvider;