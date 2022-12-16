import { List, Box, Button } from "@mui/material";
import { useComics } from "../contexts/ComicProvider";
import MarvelListItem from "./MarvelListItem";
import GetComicsPrompt from "./GetComicsPrompt";
import { useAuth } from "../contexts/AuthProvider";
import SignUp from "./auth/SignUp";

function MarvelList() {

    const { results, cacheExists, ableToLoadMore, loadMore } = useComics();
    const { currentUser } = useAuth();

    let counter = 0;
    let listItems = results.map(item => {
        counter = counter + 1;
        let bg = '#3f51b5';
        if (counter % 2 === 0) {
            bg = 'secondary'
        }
        return (
            <>
                <MarvelListItem key={item.id} bg={bg} counter={counter} comic={item} />
            </>
        )

    });

    return (
        <>
            <Box
                display="flex"
                sx={{ flexDirection: 'column', alignItems: 'center' }}>
                {!currentUser && <SignUp />}
                {cacheExists && currentUser &&
                    <List sx={{ width: { xs: '90%', lg: '25%' } }}>
                        {listItems}
                    </List>
                }
                {!cacheExists && currentUser && <GetComicsPrompt />}
                {ableToLoadMore &&
                    <Button
                        variant="contained"
                        size="large"
                        color="info"
                        onClick={loadMore}
                        sx={{ marginBottom: '1em', width: { xs: '90%', lg: '25%' } }} >Load More</Button>}
            </Box>
        </>
    );
}

export default MarvelList;