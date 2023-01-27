import { FormControl, FormControlLabel, FormGroup, FormLabel, Paper, Switch, Typography } from "@mui/material";
import { useSettings } from "../../../../contexts/SettingsProvider";

const SettingsTab = () => {
    const { showPriorNext, changePriorNext } = useSettings();

    return (
        <>
            <Paper elevation={1} sx={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1em', padding: '1em', }}>
                <Typography
                    textAlign="center"
                    variant="h3"
                >
                    Settings
                </Typography>
                <Typography
                    textAlign="center"
                    variant="body1"
                    sx={{ fontStyle: 'italic' }}
                >
                    Here you can customize your experience
                </Typography>
                <FormControl sx={{ display: 'flex', alignItems: 'center' }}>

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch color="info" checked={showPriorNext} onChange={changePriorNext} />
                            }
                            label="Show prior and upcoming reading"
                            labelPlacement="start"
                        />
                    </FormGroup>

                </FormControl>
            </Paper>
        </>
    );
}

export default SettingsTab;