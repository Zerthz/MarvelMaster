import { Container, Box, Typography, Avatar, Grid, TextField, Button, Link } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { Link as BrowserLink } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';


const ResetPassword = () => {
    const { resetPassword } = useAuth();

    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const emailRef = useRef();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);
            await resetPassword(emailRef.current.value);
            setConfirmation(true);
        } catch (error) {

            console.log(error)
        }
        setLoading(false);
    };
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockResetIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                        {confirmation &&
                            <Typography color="error" sx={{ fontStyle: 'italic' }}>
                                "Check your email for further instructions to reset!"
                            </Typography>}

                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            ref={emailRef}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item>
                                <Link component={BrowserLink} to="/LogIn" variant="body2">
                                    Log In
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={BrowserLink} to="/SignUp" variant="body2">
                                    Need an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default ResetPassword;