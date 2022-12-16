import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab, Fade, useScrollTrigger } from "@mui/material";
import { Box } from "@mui/system";

const ScrollTopFab = () => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                <Fab size="large">
                    <KeyboardArrowUp fontSize="large" />
                </Fab>
            </Box>
        </Fade>
    );
}

export default ScrollTopFab;