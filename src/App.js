import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { deepOrange, indigo, teal } from "@mui/material/colors";
import Main from "./components/navigation/Main";
import MarvelMasterProvider from "./contexts/ComicProvider";
import AuthProvider from "./contexts/AuthProvider";
import ResponsiveAppBar from "./components/navigation/ResponsiveAppBar";
import RepoProvider from "./contexts/RepoProvider";
import SettingsProvider from "./contexts/SettingsProvider";


function App() {
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: indigo,
      secondary: deepOrange,
      info: teal,
      pink: createColor("#e91e63")
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AuthProvider>
          <RepoProvider>
            <SettingsProvider>
              <MarvelMasterProvider>
                <ResponsiveAppBar />
                <Main />
              </MarvelMasterProvider>
            </SettingsProvider>
          </RepoProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
