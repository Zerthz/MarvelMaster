import { createContext, useEffect, useState } from 'react';

export const MarvelMasterContext = createContext();

const MarvelMasterProvider = (props) => {
    const [results, setResults] = useState([]);
    const [errors, setErrors] = useState([]);
    const [cacheExists, setCacheExists] = useState();
    const [errorCount, setErrorCount] = useState(0);

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
            setResults(cache);
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
        <MarvelMasterContext.Provider
            value={{
                results, cacheExists, fetchComics, store, updateComic, errors, removeComic, errorCount
            }}
        >
            {props.children}
        </MarvelMasterContext.Provider>
    )
}

export default MarvelMasterProvider;