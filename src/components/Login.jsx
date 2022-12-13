import { LockOutlined } from "@mui/icons-material";
import { Container, Box, Typography, Avatar, Grid, TextField, Button, Link } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link as BrowserLink, useNavigate } from 'react-router-dom';


const Login = () => {
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await login(email, password);
            navigate("/");
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
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container justifyContent="flex-end">
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

export default Login;