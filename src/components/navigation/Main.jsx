import { Route, Routes } from "react-router-dom";
import ErrorList from "../ErrorList";
import Login from "../auth/Login";
import MarvelList from "../MarvelList";
import Profile from "../auth/Profile/Profile";
import SignUp from "../auth/SignUp";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "./LadningPage";
import NotFound from "./NotFound";
import ResetPassword from "../auth/ResetPassword";



const Main = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route element={<PrivateRoute />}>
                <Route path="/list">
                    <Route path="/list/:id" element={<MarvelList />} />
                </Route>
                <Route path="/Errors" element={<ErrorList />} />
            </Route>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/LogIn" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Main;