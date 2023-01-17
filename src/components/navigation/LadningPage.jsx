import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthProvider";

const LandingPage = () => {
    const { makeAdmin, currentUser } = useAuth();
    const emailRef = useRef();


    const handleSubmit = async (event) => {
        event.preventDefault();


        makeAdmin(emailRef.current.value);
    }
    return (
        <>
            <Typography>
                Most scuffed loading page of all time
            </Typography>
            {currentUser.admin && <Box display="flex"
                sx={{ flexDirection: 'column', alignItems: 'center', paddingTop: '2em', gap: '0.5em' }}>

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '25%'
                    }}
                >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                        <TextField
                            required
                            fullWidth
                            variant="standard"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            inputRef={emailRef}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Make Admin
                        </Button>
                    </Box>
                </Box>
            </Box>}

        </>
    );
}

export default LandingPage;