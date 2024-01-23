import React, { useContext, useState } from 'react';
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
const HouseCard = ({house}) => {
    

    const {user} =useContext(AuthContext)
const [userData]  = useUserData(user)
const [houseData] = useHousesData(user)
const axiosPublic = useAxiosPublic()
const [startDate, setStartDate] = useState(new Date());
const day = startDate.getDate()
const month = startDate.getMonth()
const year = startDate.getFullYear()

    const handleAddPhone = e =>{
        e.preventDefault()
        const form = e.target
        const email = userData.email
        const title = form.title.value
        const address = form.address.value
        const city = form.city.value
        const size = form.size.value
        const phone = form.phone.value
        const rent = form.rent.value
        const photo = form.photo.value
        const bed = form.bed.value
        const bath = form.bath.value
        const date = day+'/'+month+'/'+year
        const description = form.description.value
        const addTask = {title,email, date, address,phone,bed, bath, city, size, rent,photo, description}
        console.log(houseData)
    
        axiosPublic.post(`/house`, addTask)
        .then(data =>{
            if(data.status == 200){
                e.target.reset()
                    Swal.fire({position: "top-end",icon: "success", title: "Added Home", showConfirmButton: false, timer: 1500 });
                }
        })
    }

    const btnClass = "btn w-fit mx-auto font-bold flex justify-end  bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"

    return (
        <div  className="card w-fit lg:w-96 bg-base-100 shadow-xl">
            <figure><img src={house.photo} alt="Shoes" /></figure>
            <div className="card-body">
                <div className="space-y-2 font-medium">
                    <div className="grid grid-cols-3 justify-between gap-10">
                    <div className="col-span-2">
                    <h1 className="font-medium text-base lg:text-xl">{house.title}</h1>
                    <h1 className="text-sm lg:text-base font-normal ">{house.address},{house.city}</h1>
                    </div>
                    <div className="flex justify-end">
                    <h1 className="font-medium text-base lg:text-xl">${house.rent}</h1>
                    </div>
                    </div>
                    <div className="">
                        <div className="flex justify-between text-lg text-center my-5">
                            <h1  > {house.bed} Bed</h1>
                            <h1  >{house.bath} Bath</h1>
                            <h1  >{house.size} sqft</h1>
                        </div>
                    <div><h1 className="font-bold text-xl text-center mb-2">Availability Date: {house.date}</h1></div>
                        
                        <div></div>
                    </div>
                </div>
                <div className=" justify-center ">
                    <div className="flex">
                    <button className={btnClass} onClick={()=>document.getElementById('my_modal_3').showModal()}><span className="text-xl"><FaPencilAlt /></span>Edit</button>
                    <dialog id="my_modal_3" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <div className="modal-action flex flex-col">
                        <form  onSubmit={handleAddPhone} className="lg:space-y-10 form my-10">
                                        <div className=" md:gap-6 ">
                                        <div className="lg:w-[500px] mx-auto  text-[#FFffff]">
                                            <h1>Availability Date</h1>
                                                <DatePicker className="lg:text-3xl bg-[#000000] text-center text-xl" selected={startDate} onChange={(date)  => setStartDate(date)} />
                                                </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input type="text" name="title"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Name" required />
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input type="text" name="address"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Address" required />
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input type="text" name="city"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="City" required />
                                        </div>
                                        
                                            <div className="lg:flex justify-between items-end gap-20 space-y-10 lg:space-y-0 mb-10">
                                                

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="number" name="phone"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Phone" required />
                                                </div>

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="text" name="photo"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Photo" required />
                                                </div>

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="number" name="rent"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Rent" required />
                                                </div>
                                            </div>
                                            <div className="lg:flex justify-between items-end gap-20 space-y-10 lg:space-y-0 mb-10">
                                            <div className="relative z-0 w-full  group">
                                                    <input type="number" name="bath"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Bathrooms" required />
                                                </div>

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="text" name="bed"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Bedrooms" required />
                                                </div>

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="number" name="size"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Size" required />
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                        <textarea name="description" placeholder="Description"  className="textarea textarea-bordered h-[200px] textarea-lg w-full " ></textarea>
                                        </div>
                                <button type="submit" className="btnTask btn">Add House</button>
                                </form>
                                <form method="dialog" className="w-full">
                                <button className="btn">Close</button>

                        </form>
                        
                        </div>
                    </div>
                    </dialog>
                    <button className={`${btnClass } margin-0 border-0`}><span className="text-xl"><MdDeleteForever /></span>Delete</button>
                    </div>
                        <h1 className="text-lg font-bold flex justify-center items-center gap-2 mt-5"><LuPhoneCall />{house.phone}</h1>
                </div>
            </div>
            </div>
    );
};

export default HouseCard;