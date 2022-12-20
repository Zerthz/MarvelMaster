import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <Typography>
                Most scuffed loading page of all time
            </Typography>
            <Link to="/list/jhtms">link</Link>
        </>
    );
}

export default LandingPage;