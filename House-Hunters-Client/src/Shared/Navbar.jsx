import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext/AuthProvider";
import useUserData from "../Hooks/useUserData";

const Navbar = () => {
    const {user, signOut} = useContext(AuthContext)
    const [userData, refetch] = useUserData(user)

    const navClass = " border-b-2 border-transparent hover:border-black"
    const handleLogOut = () =>{
        signOut()
        refetch()
    }

    const navLinks = <div className="text-xl flex gap-2 lg:gap-10 items-center font-medium flex-col lg:flex-row">
        {userData.status == 'Renter' &&<NavLink to={'/'} className={navClass}>Home</NavLink>}
        <NavLink to={userData.status == 'Owner'? '/owner' : '/renter'} className={navClass}>Dashboard</NavLink>
        <NavLink className={`${navClass} hover:border-white`  }>{userData.name}</NavLink>
        {!user? <NavLink  to='/logIn' className="btn">Log In</NavLink>:
        <NavLink  onClick={handleLogOut} className="btn">Log Out</NavLink>
        }
    </div>
    
    return (
        <div>
           <div className="navbar shadow-lg lg:flex justify-between items-center lg:p-5">
                <div className="">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow bg-base-100 rounded-box w-fit">
                                {navLinks}
                            </ul>
                        </div>
                        <a className="btn btn-ghost text-xl">House Hunter</a>
                    </div>
                    <div className=" hidden lg:flex justify-end">
                        <ul className="menu menu-horizontal px-1">
                            {navLinks}
                        </ul>
                    </div>

            </div>
        </div>
    );
};

export default Navbar;