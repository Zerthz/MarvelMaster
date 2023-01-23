export const getComicsLength = (arc) => {
    return arc.ArcParts.filter(x => x.IsComic).length;
}

export const getReadComicsLength = (arc) => {
    return arc.ArcParts.filter(x => (x.Read && x.IsComic)).length;
}

export default getComicsLength;