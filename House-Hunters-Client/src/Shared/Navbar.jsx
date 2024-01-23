import { NavLink } from "react-router-dom";

const Navbar = () => {

    const navClass = " border-b-2 border-transparent hover:border-black"

    const navLinks = <div className="text-xl flex gap-2 lg:gap-10 items-center font-medium flex-col lg:flex-row">
        <NavLink className={navClass}>Home</NavLink>
        <NavLink className={navClass}>Dashboard</NavLink>
        <NavLink  to='/logIn' className="btn">Log In</NavLink>
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