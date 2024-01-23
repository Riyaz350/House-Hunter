import {  useState } from "react";
import Swal from "sweetalert2";
import { Link,  useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";


const Register = () => {
    const [name, setName] =useState("")
    const [email, setEmail] =useState("")
    const [phone, setPhone] =useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()



const handleEmailRegister = e=>{
    e.preventDefault()
    if(password.length<6){
        Swal.fire({position: "top-end", icon: "error", title: "Password must be at lease 6 characters", showConfirmButton: false, timer: 1500});
        
    }else if(!/[A-Z]/.test(password)){
        Swal.fire({position: "top-end", icon: "error", title: "Password must have a capital letter", showConfirmButton: false, timer: 1500});

        
    }
    else if(!/[^a-zA-Z0-9]/.test(password)){
        Swal.fire({position: "top-end", icon: "error", title: "Password must have a special character", showConfirmButton: false, timer: 1500});

        
    }else{
        const userData = {name:name, phone:phone, email:email, password:password}
        axiosPublic.post('/user', userData)
        .then(res =>{
            if(res.data.acknowledged){
                Swal.fire({position: "top-end", icon:'success', title: "Success, Please Log In Again", showConfirmButton: false, timer: 1500})
                navigate('/logIn')
            }else{
                Swal.fire({position: "top-end",icon:'error',  title: "User with this email already exists", showConfirmButton: false, timer: 1500})
            }
        })
    }
}
    return (
        <div >

            <div  className="py-20 lg:p-20">
            <div className={"text-black light-home max-w-xl rounded-3xl mx-auto my-20 py-10 px-5 lg:p-20 border-2 border-black"}>
                <div className="text-center ">
                <h1 className="text-3xl mb-10 lg:text-5xl font-bold ">Sign Up </h1>
                </div>
                <div className="bg-white p-10 rounded-xl">
                <form onSubmit={handleEmailRegister} className="bg-white">

                    <div className="form-control">
                    <label className="label">
                        <span className="label-text text-[#0d3454]">Full Name</span>
                    </label>
                    <input onChange={e=>setName(e.target.value)} type="tel"  placeholder="Full Name" className="input input-bordered border-[#0d3454] text-[#0d3454]" required />
                    </div>

                    <div className="form-control">
                    <label className="label">
                        <span className="label-text text-[#0d3454]">Phone</span>
                    </label>
                    <input onChange={e=>setPhone(e.target.value)} type="text"  placeholder="Phone Number" className="input input-bordered border-[#0d3454] text-[#0d3454]" required />
                    </div>

                    <div className="form-control">
                    <label className="label">
                        <span className=" label-text text-black">Email</span>
                    </label>
                    <input onChange={e=> setEmail(e.target.value)} type="email"  placeholder="email" className="input input-bordered border-[#0d3454] text-[#0d3454]" required />
                    </div>


                    <div className="form-control">
                    <label className="label">
                        <span className="text-black">Password</span>
                    </label>
                    <input onChange={e=> setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered border-[#0d3454]" required />
                    <div>
                    </div>

                    <label className="label">
                        <a href="#" className= "text-black label-text-alt text-base link link-hover">Forgot password?</a>
                    </label>
                    </div>


                    <div className="form-control mt-4">
                    <button className="btn  bg-white text-black font-bold border-black hover:shadow-white hover:bg-[#000000] hover:text-white   ">Register</button>
                    </div>

                        

                    <div className="space-y-5 mt-5">
                    <p className="text-center ">Already have an account?? <Link to="/logIn" className="text-blue-500 hover:underline">Log In</Link></p>
                    </div>
                </form>
               
                </div>
            </div>
            </div>
        </div>
    );
};

export default Register;