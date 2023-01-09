import { Box, Typography } from "@mui/material";

const ArcHeader = ({ title, description, image }) => {
    let style = {
        width: '100%'
    }



    return (
        <Box sx={{ padding: '1em' }}>
            {image && <img src={image} style={style} />}
            <Typography variant="h3" align="center">
                {title}
            </Typography>
            <Typography variant="body1" align="center">
                {description}
            </Typography>
        </Box>
    );
}

export default ArcHeader;