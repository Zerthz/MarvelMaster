import { List, Typography, Box, } from "@mui/material";
import { useComics } from "../contexts/ComicProvider";
import ErrorListItem from "./ErrorListItem";

function ErrorList() {

    const { userData } = useComics();

    let counter = 0;
    let listItems = userData.errors.map(item => {
        counter = counter + 1;
        let bg = '#3f51b5';
        if (counter % 2 === 0) {
            bg = 'secondary'
        }
        return (
            <>
                <ErrorListItem key={item.Id} bg={bg} counter={counter} comic={item} />
            </>
        )

    });

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                flexDirection={"column"}>
                {userData.errors.length > 0 ?
                    <>
                        <Typography variant="h4" pt={2}>
                            Errors
                        </Typography>
                        <List sx={{ width: { xs: '90%', lg: '25%' } }}>
                            {listItems}
                        </List>
                    </>
                    :
                    <Typography>
                        Luckily there are no errors! :)
                    </Typography>
                }
            </Box>

        </>
    );
}

export default ErrorList;