import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const LogIn = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState("")
    const [password, setPassword] =useState("")
    
    // Email password sign in
    const handleSignIn = e =>{
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <div >
            <div data-aos='fade-up' className="py-20 lg:p-20">
                <div className={"text-black light-home max-w-xl rounded-3xl mx-auto my-20 py-10 px-5 lg:p-20 border-2 border-black"}>
                    <div className="text-center ">
                    <h1 className="text-3xl mb-10 lg:text-5xl font-bold ">Sign in </h1>
                    </div>
                    <div className="bg-white p-10 rounded-xl">
                    <form onSubmit={handleSignIn} className="bg-white">
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
                        <button className="btn  bg-white text-black font-bold border-black hover:shadow-white hover:bg-[#000000] hover:text-white   ">Login</button>
                        </div>
                            <div className="space-y-5 mt-5">
                            <p className="text-center ">Do not have an account?? <Link to="/register" className="text-blue-500 hover:underline">Register Here</Link></p>
                            </div>
                    </form>
                    
                    </div>
                </div>
                </div>
            </div>
    );
};

export default LogIn;
