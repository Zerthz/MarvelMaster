import { Route, Routes } from "react-router-dom";
import ErrorList from "../ErrorList";
import Login from "../auth/Login";
import MarvelList from "../MarvelList";
import Profile from "../auth/Profile";
import SignUp from "../auth/SignUp";
import PrivateRoute from "./PrivateRoute";



const Main = () => {
    return (
        <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<MarvelList />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="MM">
                    <Route path="/MM/:id" element={<MarvelList />} />
                </Route>
                <Route path="/Errors" element={<ErrorList />} />
            </Route>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/LogIn" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
        </Routes>
    );
}

export default Main;