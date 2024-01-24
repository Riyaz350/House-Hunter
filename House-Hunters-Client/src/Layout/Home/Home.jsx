import { useContext } from "react";
import useUserData from "../../Hooks/useUserData";
import Navbar from "../../Shared/Navbar";
import { AuthContext } from "../../Authentication/AuthContext/AuthProvider";
import { useMediaQuery } from "react-responsive";
import HouseCard from "../../Shared/HouseCard/HouseCard";
import useAllHousesData from "../../Hooks/useAllHouseData";

const Home = () => {
    const {user} = useContext(AuthContext)
    const [userData] = useUserData(user)
    const [houses] = useAllHousesData()
    const isWideScreen = useMediaQuery({ minWidth: 1025 });

    return (
        <div>
            <Navbar></Navbar>
            <div style={{ gridTemplateColumns: isWideScreen ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', gap: '1rem', padding: '1rem', boxSizing: 'border-box', width: '100%', }} className="lg:grid lg:grid-cols-4 md:grid-cols-2 justify-center mx-auto space-y-5 lg:space-y-0">
            {houses.map(house=><HouseCard key={house._id} house={house}></HouseCard>)}
        </div>
        </div>
    );
};

export default Home;