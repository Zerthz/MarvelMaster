import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { deepOrange, indigo } from "@mui/material/colors";
import Main from "./components/navigation/Main";
import MarvelMasterProvider from "./contexts/ComicProvider";
import AuthProvider from "./contexts/AuthProvider";
import ResponsiveAppBar from "./components/navigation/ResponsiveAppBar";
import RepoProvider from "./contexts/RepoProvider";


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
        <AuthProvider>
          <RepoProvider>
            <MarvelMasterProvider>
              <ResponsiveAppBar />
              <Main />
            </MarvelMasterProvider>
          </RepoProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
