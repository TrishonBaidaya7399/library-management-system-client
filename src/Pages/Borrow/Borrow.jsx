import { useContext, useEffect, useState } from "react";
import { MdDelete } from 'react-icons/md';
// import { RiDeleteBin5Line } from 'react-icons/ri';
// import { FiCornerUpLeft } from 'react-icons/fi';
// import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Borrow = () => {
const {user}= useContext(AuthContext);
const [bookings, setBookings] = useState([]);

const url = `http://localhost:5000/borrowed?email=${user?.email}`
useEffect(()=>{
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        setBookings(data)
    })
    .catch(error =>{
        console.log(error.message);
    })
},[])

return (
<div className="mx-[20px] md:mx-[50px] lg:mx-[100px] my-12">
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="text-xl text-blue-400">
        <th>Delete</th>
        <th>Books</th>
        <th>Users</th>
        <th>Borrowed </th>
        <th>Return </th>
        <th>Approval</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        bookings.map(booking =>
            <tr key={booking._id}>
                {/* onClick={()=> handleRemove(booking._id)}  */}
            <td><button className="text-red-600 text-[40px]"><MdDelete/></button></td>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className=" w-[80px] h-[100px]">
                    <img src={booking?.photo} className="" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-xl font-bold">{booking?.title}</div>
                  <div className="text-sm opacity-50 text-lg font-semibold">{booking?.category}</div>
                </div>
              </div>
            </td>
            <td className="text-lg font-bold">{booking?.userName}<br/><span className="text-sm font-normal">{booking?.email}</span></td>
            <td className="text-lg ">{booking?.borrowData}</td>
            <td className="text-lg ">{booking?.returnDate}</td>
            <th>
              <button className="btn btn-ghost btn-xs">Pending...</button>
            </th>
            <th>
              <button className="btn bg-gradient-to-r from-purple-700 to-blue-300 text-white btn-md text-md">Return</button>
            </th>
          </tr>
        )
      }
     
    </tbody>    
  </table>
</div>
    </div>
    );
};

export default Borrow;
