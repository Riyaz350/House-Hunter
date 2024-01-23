import { Outlet } from "react-router-dom";
import Owner from "../Dashboard/Owner/Owner";
import Renter from "../Dashboard/Renter/Renter";

const Main = () => {
    const status ='renter'
    return (
        <div>
            <Outlet></Outlet>
            {status == 'renter'?<Owner></Owner>:<Renter></Renter>}
        </div>
    );
};

export default Main;