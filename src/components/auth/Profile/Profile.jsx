import { CloudDownloadOutlined, CloudUploadOutlined } from "@mui/icons-material";
import { Alert, Button, Divider, Paper, Snackbar, Tab, Tabs, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import { useComics } from "../../../contexts/ComicProvider";
import { useRepo } from "../../../contexts/RepoProvider";
import ProfileTab from "./Tabs/ProfileTab";
import SettingsTab from "./Tabs/SettingsTab";
import TabPanel from "./Tabs/TabPanel";

const Profile = () => {
    const { logout, currentUser } = useAuth();
    const { uploadFixed } = useRepo();
    const { userData } = useComics();

    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    let navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    }

    const handleUpload = () => {
        try {
            let result = JSON.parse(JSON.stringify(userData.xmen));
            let data = {
                Result: result,
            }
            uploadFixed(data);
            setOpen(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDownload = async () => {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        await logout();
        navigate("/LogIn")
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    useEffect(() => {
    }, [])
    return (
        <>
            <Box
                sx={{ display: 'flex', alignContent: 'center', flexDirection: 'column', mt: 4, width: { sm: '100%' } }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    centered
                >
                    <Tab label="Profile" />
                    <Tab label="Settings" />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <ProfileTab handleUpload={handleUpload} handleDownload={handleDownload} handleLogout={handleLogout} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <SettingsTab />
                </TabPanel>

            </Box>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Upload Successful
                </Alert>
            </Snackbar>

        </>
    );
}

export default Profile;