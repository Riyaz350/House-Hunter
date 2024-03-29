import { useContext, useState } from "react";
import Navbar from "../../../Shared/Navbar";
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Authentication/AuthContext/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCirclePlus } from "react-icons/ci";
import useUserData from "../../../Hooks/useUserData";
import useHousesData from "../../../Hooks/useHousesData";
import HouseCard from "../../../Shared/HouseCard/HouseCard";
import { useMediaQuery } from 'react-responsive';
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import useBookings from "../../../Hooks/useBookings";


const Owner = () => {
            

const {user} =useContext(AuthContext)
const [userData]  = useUserData(user)
const [bookingsData,,customRe] = useBookings(user)
const [houseData,,refetch] = useHousesData(user)
const axiosPublic = useAxiosPublic()
const [startDate, setStartDate] = useState(new Date());
const day = startDate.getDate()
const month = startDate.getMonth() +1
const year = startDate.getFullYear()
const isWideScreen = useMediaQuery({ minWidth: 1025 });

const btnClass = "btn w-fit mx-auto font-bold flex justify-end  bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"

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
    const date = day+'/'+ month +'/'+year
    const description = form.description.value
    const addTask = {title,email, date, address,phone,bed, bath, city, size, rent,photo, description}
    console.log(houseData)

    axiosPublic.post(`/house`, addTask)
    .then(data =>{
        if(data.status == 200){
            e.target.reset()
            refetch()
                Swal.fire({position: "top-end",icon: "success", title: "Added Home", showConfirmButton: false, timer: 1500 });
            }
    })
}

const handleDelete =(e)=>{
    axiosPublic.delete(`/house/${e}`)
    .then(res=>{
        if(res.data.acknowledged){
            refetch()
            Swal.fire({position: "top-end",icon: "success", title: "Deleted Home", showConfirmButton: false, timer: 1500 });

        }
    })
}
const handleApprove = (id, email, Id) =>{
    axiosPublic.get(`/user/${email}`)
    .then(res=>{
        console.log(res.data.owned)
        if(res.data.owned.length<=2){

        axiosPublic.put(`/users/${email}`, {id:id})
        .then(res=>console.log(res))
        axiosPublic.delete(`/book/${Id}`)
        .then(res=>{
            if(res.data.acknowledged){
                customRe()
            }
        })
    }else{
        Swal.fire({position: "top-end",icon: "error", title: "User Owens more than 2 home", showConfirmButton: false, timer: 1500 });

    }

})
}
const handleDel = ( Id) =>{
    axiosPublic.delete(`/book/${Id}`)
    .then(res=>{
        if(res.data.acknowledged){
            customRe()
        }
    })
}

return (
    <div className=''>
                    
        <Navbar></Navbar>

    <div className="lg:flex justify-center gap-10">
        <div>
            <button className={`${btnClass} my-5 lg:my-10 `} onClick={()=>document.getElementById('my_modal_3').showModal()}><span className="text-xl">< CiCirclePlus /></span>Show Bookings</button>
            <dialog id="my_modal_3" className="modal">
                <div className="bg-white w-2/3 h-1/2 p-10 rounded-lg ">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white">✕</button>
                    </form>
                    <div className="space-y-5">
                        {bookingsData.map(book => 
                        <div key={book._id} className=" flex text-xl lg:text-3xl gap-2">
                        <h1 className=" w-[300px]"> Renter: {book.name}</h1>
                        <h1 className="w-full"> House name: {book.houseName}</h1>
                        <button onClick={()=>handleApprove(book.ID, book.email, book._id)} className={btnClass}>Approve</button>
                        <button onClick={()=>{handleDel(book._id)}} className={btnClass}>Deny</button>
                        </div>)}
                    </div>
                </div>
            </dialog>
        </div>
        <div>
            <button className={`${btnClass} my-5 lg:my-10 `} onClick={()=>document.getElementById('my_modal_4').showModal()}><span className="text-xl">< CiCirclePlus /></span>Add Home</button>
            <dialog id="my_modal_4" className="modal">
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
        </div>
    </div>

    <div style={{ gridTemplateColumns: isWideScreen ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', gap: '1rem', padding: '1rem', boxSizing: 'border-box', width: '100%', }} className="lg:grid lg:grid-cols-4 md:grid-cols-2 justify-center mx-auto space-y-5 lg:space-y-0">
            {houseData.map(house=><div key={house._id} className="card w-fit md:w-1/2 mx-auto lg:w-96 bg-base-100 shadow-xl">
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
                    { userData.status !== "Renter" ?
                    <div className="flex">
                    <button className={btnClass} onClick={()=>document.getElementById(house._id).showModal()}><span className="text-xl"><FaPencilAlt /></span>Edit</button>
                    <dialog id={house._id} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <div className="modal-action flex flex-col">
                        <form  onSubmit={handleAddPhone} className="lg:space-y-10 form my-10">
                                        <div className=" md:gap-6 ">
                                        <div className="lg:w-[650px] mx-auto  text-[#FFffff] lg:flex gap-5 w-full">
                                            <h1>Availability Date</h1>
                                                <DatePicker  className="lg:text-3xl bg-[#000000] text-center text-xl"  selected={startDate} onChange={(date)  => setStartDate(date)} />
                                                <h1 className='text-red-500 font-bold'>(Reset the date)</h1>
                                                </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input type="text" defaultValue={house.title} name="title"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Name" required />
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input type="text" defaultValue={house.address} name="address"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Address" required />
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input type="text" defaultValue={house.city} name="city"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="City" required />
                                        </div>
                                        
                                            <div className="lg:flex justify-between items-end gap-20 space-y-10 lg:space-y-0 mb-10">
                                                

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="number" defaultValue={house.phone} name="phone"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Phone" required />
                                                </div>

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="text" defaultValue={house.photo} name="photo"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Photo" required />
                                                </div>

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="number" defaultValue={house.rent} name="rent"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Rent" required />
                                                </div>
                                            </div>
                                            <div className="lg:flex justify-between items-end gap-20 space-y-10 lg:space-y-0 mb-10">
                                            <div className="relative z-0 w-full  group">
                                                    <input type="number" defaultValue={house.bath} name="bath"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Bathrooms" required />
                                                </div>

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="text" defaultValue={house.bed} name="bed"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Bedrooms" required />
                                                </div>

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="number" defaultValue={house.size} name="size"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Size" required />
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                        <textarea name="description" defaultValue={house.description} placeholder="Description"  className="textarea textarea-bordered h-[200px] textarea-lg w-full " ></textarea>
                                        </div>
                                <button type="submit" className="btnTask btn">Update House</button>
                                </form>
                                <form method="dialog" className="w-full">
                                <button className="btn">Close</button>

                        </form>
                        
                        </div>
                    </div>
                    </dialog>
                    <button onClick={()=>handleDelete(house._id)} className={`${btnClass } margin-0 border-0 text-red-500 border-red-500 hover:bg-red-500 hover:border-red-500`}><span className="text-xl"><MdDeleteForever /></span>Delete</button>
                    </div> :
                    <><button className={btnClass}>Book Now</button></>
                    }
                        <h1 className="text-lg font-bold flex justify-center items-center gap-2 mt-5 border-2 w-fit mx-auto rounded-lg p-1 border-black"><LuPhoneCall />{house.phone}</h1>
                </div>
                }
            </div>
            </div>)}
        </div>

    </div>                                                                                       
);



};

export default Owner;