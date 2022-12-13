import { List, Box } from "@mui/material";
import { useComics } from "../contexts/ComicProvider";
import MarvelListItem from "./MarvelListItem";
import GetComicsPrompt from "./GetComicsPrompt";
import { useAuth } from "../contexts/AuthProvider";
import SignUp from "./SignUp";

function MarvelList() {

    const { results, cacheExists } = useComics();
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
                justifyContent="center">
                {!currentUser && <SignUp />}
                {cacheExists && currentUser &&
                    <List sx={{ width: '25%' }}>
                        {listItems}
                    </List>
                }
                {!cacheExists && currentUser && <GetComicsPrompt />}
            </Box>

        </>
    );
}

export default MarvelList;