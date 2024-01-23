import { useContext, useState } from "react";
import Navbar from "../../../Shared/Navbar";
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Authentication/AuthContext/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCirclePlus } from "react-icons/ci";
import useUserData from "../../../Hooks/useUserData";


const Owner = () => {
            

const {user} =useContext(AuthContext)
const [userData]  = useUserData(user)
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
    console.log(addTask)

    axiosPublic.post(`/house`, addTask)
    .then(data =>{
        if(data.status == 200){
            e.target.reset()
                Swal.fire({position: "top-end",icon: "success", title: "Added Home", showConfirmButton: false, timer: 1500 });
            }
    })

}

return (
    <div className=''>
                    
        <Navbar></Navbar>

        <div>
            <button className="btn btnTask w-fit mx-auto font-bold flex justify-end mt-10 bg-white border-2 border-black" onClick={()=>document.getElementById('my_modal_4').showModal()}><span className="text-xl">< CiCirclePlus /></span>Add Home</button>
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

        <div className=" ">

        </div>

    </div>                                                                                       
);



};

export default Owner;