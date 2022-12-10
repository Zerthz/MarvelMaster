import { Box, Button, createTheme, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { deepOrange, indigo } from "@mui/material/colors";
import { Container } from "@mui/system";
import { useContext } from "react";
import MarvelList from "./components/MarvelList";
import DenseAppBar from "./components/navigation/DenseAppBar";
import Main from "./components/navigation/views/Main";
import MarvelMasterProvider, { MarvelMasterContext } from "./contexts/MasterProvider";


function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: indigo,
      secondary: deepOrange
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MarvelMasterProvider>
          <DenseAppBar />
          <Main />


        </MarvelMasterProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
