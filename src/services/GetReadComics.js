// input is comic array
const getReadComics = (allComics) => {
    let readList = allComics.reduce((readList, comic) => {
        if (comic.read) {
            readList.push(comic);
        }
        return readList;
    }, [])
    return readList;
}
export default getReadComics;