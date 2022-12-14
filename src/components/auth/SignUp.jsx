import { LockOutlined } from "@mui/icons-material";
import { Container, Box, Typography, Avatar, Grid, TextField, Button, Link } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { Link as BrowserLink, useNavigate } from 'react-router-dom';
import HandleAuthErrorMessages from "../../services/HandleAuthErrors";


const SignUp = () => {
    const { signUp } = useAuth();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    let navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    }




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setErrorMessage("You need to fill in an email");
            return;
        }
        if (password !== passwordConfirm) {
            setErrorMessage("Passwords don't match");
            return;
        }


        try {
            setLoading(true);
            setErrorMessage("");
            await signUp(email, password);
            navigate("/");
        } catch (error) {
            setErrorMessage(HandleAuthErrorMessages(error));
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
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={handlePasswordChange}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordConfirm"
                                    label="Confirm Password"
                                    type="password"
                                    id="passwordConfirm"
                                    autoComplete="new-password"
                                    value={passwordConfirm}
                                    onChange={handlePasswordConfirmChange}

                                />
                            </Grid>
                        </Grid>
                        {errorMessage &&
                            <Typography color="error" sx={{ fontStyle: 'italic' }}>
                                {errorMessage}
                            </Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={BrowserLink} to="/LogIn" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default SignUp;