import { Paper, Typography } from "@mui/material";

const ArcSubheader = ({ title, description }) => {
    return (
        <Paper sx={{ marginTop: '0.5em', marginBottom: '1em', padding: '1em' }}>
            <Typography variant="h4">
                {title}
            </Typography>
            <Typography variant="body2">
                {description}
            </Typography>
        </Paper>
    );
}

export default ArcSubheader;