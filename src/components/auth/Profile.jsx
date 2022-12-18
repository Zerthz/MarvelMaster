import { CloudDownloadOutlined, CloudUploadOutlined } from "@mui/icons-material";
import { Button, Divider, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useComics } from "../../contexts/ComicProvider";
import { useRepo } from "../../contexts/RepoProvider";

const Profile = () => {
    const { logout, currentUser } = useAuth();
    const { setData, getUserData } = useRepo();
    const { allResults, errors, createCache } = useComics();
    let navigate = useNavigate();


    const handleUpload = async () => {
        try {
            let data = {
                results: allResults,
                missingItems: errors
            }
            await setData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDownload = async () => {
        try {
            let userData = await getUserData();
            createCache(userData.results, userData.missingItems);
            console.log("Data updated");
            console.log(userData.results, userData.missingItems);
        } catch (error) {
            console.log(error);
        }
    }


    const handleLogout = async () => {
        await logout();
        navigate("/LogIn")
    }


    useEffect(() => {
    }, [])
    return (
        <>
            <Container maxWidth="sm">
                <Paper elevation={1} sx={{ minHeight: '200px', display: 'flex', flexDirection: 'column', marginTop: '2rem', justifyContent: 'center', gap: '1em', padding: '1em' }}>
                    <Typography
                        textAlign="center"
                        variant="h3"
                    >
                        Profile
                    </Typography>
                    <Typography
                        textAlign="center"
                        variant="subtitle2">
                        {currentUser.displayName || currentUser.email}
                    </Typography>
                    <Typography
                        textAlign="center"
                        variant="body1"
                    >
                        This is your profile, you can upload your local browser data to the cloud, or you can download data from the cloud.
                        This is irreversable.
                    </Typography>
                    <Divider variant="middle" />
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<CloudUploadOutlined />}
                            onClick={handleUpload}
                        >Upload</Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            endIcon={<CloudDownloadOutlined />}
                            onClick={handleDownload}
                        >Download</Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="large"
                            onClick={handleLogout}
                        >Sign Out</Button>

                    </Box>
                </Paper>

            </Container>

        </>
    );
}

export default Profile;