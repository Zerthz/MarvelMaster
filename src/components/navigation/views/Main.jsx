import { Route, Routes } from "react-router-dom";
import ErrorList from "../../ErrorList";
import MarvelList from "../../MarvelList";



const Main = () => {
    return (
        <Routes>
            <Route exact path="/" element={<MarvelList />} />
            <Route path="/Part1" element={<MarvelList />} />
            <Route path="/Errors" element={<ErrorList />} />

        </Routes>
    );
}

export default Main;