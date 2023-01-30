import { CloudDownloadOutlined, CloudUploadOutlined } from "@mui/icons-material";
import { Button, Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../../../contexts/AuthProvider";

const ProfileTab = ({ handleUpload, handleDownload, handleLogout }) => {
    const { currentUser } = useAuth();




    return (
        <>
            <Paper elevation={1} sx={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1em', padding: '1em' }}>
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
                    This is your profile. You can access settings or sync your data <span style={{ fontStyle: 'italic' }}>- To be added </span>
                </Typography>
                <Typography
                    textAlign="center"
                    variant="body1"
                >
                    Syncing is irreversable
                </Typography>
                <Divider variant="middle" />
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em', flexDirection: { xs: 'column', md: 'row' } }}>
                    {currentUser.admin &&
                        <>
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
                                disabled
                            >Download</Button>
                        </>
                    }
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        onClick={handleLogout}
                    >Sign Out</Button>

                </Box>
            </Paper></>);
}

export default ProfileTab;