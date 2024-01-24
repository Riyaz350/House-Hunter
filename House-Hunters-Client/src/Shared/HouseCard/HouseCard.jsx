import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useUserData from '../../Hooks/useUserData';
import useHousesData from '../../Hooks/useHousesData';
import { AuthContext } from '../../Authentication/AuthContext/AuthProvider';
import useAxiosPublic from '../../Hooks/Axios/useAxiosPublic';
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAllHousesData from '../../Hooks/useAllHouseData';


const HouseCard = ({house}) => {
    

const {user} =useContext(AuthContext)
const [userData]  = useUserData(user)
const axiosPublic = useAxiosPublic()
const [houses] = useAllHousesData()
const email = userData.email
const owner = house.email
const ID = house._id
console.log(house)


    const btnClass = "btn w-fit mx-auto font-bold flex justify-end  bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"
    const booking = {email, ID, owner}

    const handleBooking =()=>{
        axiosPublic.post('/book', booking)
        .then(res =>console.log(res.data))
    }

    return (
        <div  className="card w-fit lg:w-96 bg-base-100 shadow-xl">
            <figure><img src={house.photo} className='h-[250px] w-full' alt="Shoes" /></figure>
            <div className="card-body">
                <div className="space-y-2 font-medium">
                    <div className="grid grid-cols-3 justify-between gap-10">
                    <div className="col-span-2">
                    <h1 className="font-medium text-base lg:text-xl">{house.title}</h1>
                    <h1 className="text-sm lg:text-base font-normal ">{house.address} , {house.city}</h1>
                    </div>
                    <div className="flex justify-end">
                    <h1 className="font-medium text-base lg:text-xl text-green-400">${house.rent}</h1>
                    </div>
                    </div>
                    <div className="">
                        <div className="flex justify-between text-lg text-center my-5">
                            <h1  > {house.bed} Bed</h1>
                            <h1  >{house.bath} Bath</h1>
                            <h1  >{house.size} sqft</h1>
                        </div>
                    <div><h1 className="font-bold text-xl text-center mb-2">Availability Date: {house.date}</h1></div>
                        
                    </div>
                </div>
                { user &&
                <div className=" justify-center ">
                    { userData.status == "Renter" &&
                    
                    <><button onClick={handleBooking} className={btnClass}>Book Now</button></>
                }
                        <h1 className="text-lg font-bold flex justify-center items-center gap-2 mt-5 border-2 w-fit mx-auto rounded-lg p-1 border-black"><LuPhoneCall />{house.phone}</h1>
                </div>
                }
            </div>
            </div>
    );
};

export default HouseCard;