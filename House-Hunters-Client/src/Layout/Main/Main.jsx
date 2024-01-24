import { Outlet } from "react-router-dom";
import Owner from "../Dashboard/Owner/Owner";
import Renter from "../Dashboard/Renter/Renter";
import useUserData from "../../Hooks/useUserData";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthContext/AuthProvider";

const Main = () => {
    const {user} = useContext(AuthContext)
    const [userData] = useUserData(user)
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;