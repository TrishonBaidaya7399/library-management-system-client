// import PropTypes from 'prop-types';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logos/logo-coloured.png"
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
const Navbar = () => {
const initialDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
const [darkMode, setDarkMode] = useState(initialDarkMode);
const {user, logOut, isAdmin} = useContext(AuthContext);
// const [cartItemCount, setCartItemCount] = useState(0);
console.log(user);
const handleSignOut=()=>{
  logOut()
  .then(
    Swal.fire({
      title: 'Logged Out!',
      text: `${user?.displayName ? user.displayName : 'User'} logged Out successfully!`,
      imageUrl: user?.photoURL ? user.photoURL : 'https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
      timer: 1500,
      showConfirmButton: false,
    })
  )
  .catch(error=>{
  console.error(error.message);  
  })
}


useEffect(() => {
  const body = document.querySelector('body');
  body.style.backgroundColor = darkMode ? '#023047' : 'white';
  body.style.color = darkMode ? 'white' : 'black';
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
}, [darkMode]);

const NavItems = <div className="flex flex-col lg:flex-row gap-4 items-center">
<NavLink className={({isActive})=> isActive ? "text-sm md:text-md lg:text-xl font-bold text-white bg-gradient-to-r from-purple-700 to-blue-400 px-3 py-2 duration-300 rounded-lg" : "px-3 py-2 text-sm md:text-md lg:text-xl font-bold text-blue-400 hover:underline"} to='/'><li>Home</li></NavLink>
{
  isAdmin 
  ?
  <NavLink className={({isActive})=> isActive ? "text-sm md:text-md lg:text-xl font-bold text-white bg-gradient-to-r from-purple-700 to-blue-400 px-3 py-2 duration-300 rounded-lg" : "px-3 py-2 text-sm md:text-md lg:text-xl font-bold text-blue-400 hover:underline"} to='/addbooks'><li>Add Book</li></NavLink>
  : ''
}
<NavLink className={({isActive})=> isActive ? "text-sm md:text-md lg:text-xl font-bold text-white bg-gradient-to-r from-purple-700 to-blue-400 px-3 py-2 duration-300 rounded-lg" : "px-3 py-2 text-sm md:text-md lg:text-xl font-bold text-blue-400 hover:underline"} to='/allbooks'><li>All Books</li></NavLink>
</div>   

    return (
<div className="navbar px-[5px] md:px-[50px] lg:px-[100px] pt-[20px]">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content w-36 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box ">
      {NavItems}
      </ul>
    </div>
    <img className="w-[180px] md:w-[250px]" src={logo} alt="" />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {NavItems}
    </ul>
  </div>
  <div className="navbar-end flex gap-4">
    {/* Dark mode enable button */}
    <label className="swap swap-rotate">
  
  {/* this hidden checkbox controls the state */}
  <input type="checkbox"  checked={darkMode} />
    {/* sun icon */}
    <BsFillSunFill onClick={()=> setDarkMode(true)} className="swap-on fill-current w-10 h-10"/>
  
    {/* moon icon */}
    <BsFillMoonStarsFill onClick={()=> setDarkMode(false)} className="swap-off fill-current w-10 h-10"/>
  
</label>
{
  user 
  ? 
    <div className="dropdown dropdown-end flex items-center text-gray-600">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-[70px] p-[2px] rounded-full border-[3px] border-blue-700">
              <img className='rounded-full' src={user?.photoURL ? user.photoURL : 'https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-[300px] z-30 p-2 shadow bg-base-100 rounded-box w-[350px]">
            <li className='w-[200px] h-[200px] rounded-lg border-[5px] border-purple-700 flex items-center justify-center mx-auto bg-gray-300'><img className='rounded-lg' src={user?.photoURL} alt="" /></li>
            {
              isAdmin
              ?
              <li className='mx-auto'><a className="justify-between bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text text-2xl font-bold text-center">Admin ID</a></li>
              : ''
            }
            <li className='mx-auto py-1'><a className="justify-between bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text text-[25px] font-bold text-center">{user?.displayName ? user.displayName : "User Logged In"}</a></li>
            <li className='mx-auto py-1'><a className="justify-between text-[16px] font-bold text-center">{user?.email ? user.email : ""}</a></li>
           
            <li className='w-full'><NavLink to='/borrowed' className="btn bg-gradient-to-r from-purple-700 to-blue-300 text-white text-center pt-3 w-full text-xl"><li>Borrowed Books</li></NavLink></li>
            <li onClick={handleSignOut} className="btn bg-gradient-to-r from-purple-700 to-blue-300 text-white text-xl"><p className='text-xl'>Logout<FiLogOut className='text-[30px]'/></p></li>
          
          </ul>
    </div>
  :
    <Link to="/signin" className="btn text-white bg-gradient-to-r from-purple-700 to-blue-400 font-bold">Login</Link>
}
  </div>
</div>
    );
};

Navbar.propTypes = {
    
};

export default Navbar;