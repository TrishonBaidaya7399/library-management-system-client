import { useContext, useEffect, useState } from "react";
// import { MdDelete } from 'react-icons/md';
// import { RiDeleteBin5Line } from 'react-icons/ri';
// import { FiCornerUpLeft } from 'react-icons/fi';
// import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
// import { useLoaderData } from "react-router-dom";

const Borrow = () => {
const {user, isAdmin}= useContext(AuthContext);
// const book = useLoaderData();
const [bookings, setBookings] = useState([]);
const [Allbookings, setAllBookings] = useState([]);
const allUrl =  `https://library-management-system-server-phi.vercel.app/borrowed`
const url = `https://library-management-system-server-phi.vercel.app/borrowed?email=${user?.email}`
useEffect(()=>{
  {  isAdmin
    ? 
    fetch(allUrl)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        setAllBookings(data)
    })
    .catch(error =>{
        console.log(error.message);
    })
    :
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        setBookings(data)
    })
    .catch(error =>{
        console.log(error.message);
    })
  }  
},[url,allUrl,isAdmin])

const handleRemove = (id) =>{
  console.log('Remove button clicked!');
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to remove this book?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Remove it!"
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(id);
      fetch(`https://library-management-system-server-phi.vercel.app/borrowed/${id}`,{method: "DELETE"})
      .then(res=> res.json())
      .then(data => {
        console.log(data);
       
        if(data.deletedCount>0){
            // send increased quantity to the server
      //    fetch(`https://library-management-system-server-phi.vercel.app/books/${book?._id}`,{
      //     method: "PATCH",
      //     headers: {
      //       "content-type":"application/json"
      //     },
      //     body: JSON.stringify({quantity:book?.quantity+2}) //-----------problem
      //   })
      // .then(res=> res.json())
      // .then(data => {
      // console.log(data + "quantity changed: " + book?.quantity);
      // })
          Swal.fire({
            title: "Removed!",
            text: "Your Book has been removed.",
            icon: "success"
          });
          const remaining = bookings.filter(booking => booking._id !== id);
          setBookings(remaining);
        }
      })
      
    }
  });

}

const handleConfirm = (id)=>{
  console.log('Confirm button clicked!');
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to confirm this borrow request?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Confirm it!"
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(id);
      fetch(`https://library-management-system-server-phi.vercel.app/borrowed/${id}`,{
        method: "PATCH",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify({status: "Confirmed"})
      })
      .then(res=> res.json())
      .then(data => {
        console.log(data);
        if(data.modifiedCount>0){
    
          Swal.fire({
            title: "Confirmed!",
            text: "This borrowing request is confirmed.",
            icon: "success"
          });
          const remaining = bookings.filter(booking => booking._id !== id);
          const updated = bookings.find(booking => booking._id === id);
          updated.status = "Confirmed";
          const newBookings = [updated, ...remaining]
          setBookings(newBookings);
          window.location.reload();
        }
      })
      
    }
  });
}



return (
<div className="mx-[20px] md:mx-[50px] lg:mx-[100px] my-12">
<div className="overflow-x-auto">
  {
    Allbookings.length > 0
    ?
    <table className="table">
    {/* head */}
    <thead>
      <tr className="text-xl text-blue-400">
        <th>Books</th>
        <th>Users</th>
        <th>Borrowed </th>
        <th>Return </th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        isAdmin
        ?
        <>
        {
        Allbookings.map(booking =>
            <tr key={booking._id}>
            <td className="md:w-[30%]">
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
              {
                booking.status === "Confirmed"
                ? <span className="bg-green-400 text-black p-2 text-md rounded-lg">CONFIRMED</span>
                : 
                <>
                {
                  isAdmin
                  ? <button onClick={()=>handleConfirm(booking?._id)} className="btn btn-sm bg-red-500 text-white">Pending...</button>
                  : <span className="bg-green-400 text-black p-2 text-md rounded-lg">Pending...</span>
                }
                </>
              
               
              }
            </th>
            <th>
              <button onClick={()=>handleRemove(booking?._id)} className="btn bg-gradient-to-r from-purple-700 to-blue-300 text-white btn-md text-md">Return</button>
            </th>
          </tr>
        )
      }
        </>
        :
        <>
        {
        bookings.map(booking =>
            <tr key={booking._id}>
            <td className="md:w-[30%]">
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
              {
                booking.status === "Confirmed"
                ? <span className="bg-green-400 text-black p-2 text-md rounded-lg">CONFIRMED</span>
                : 
                <>
                {
                  isAdmin
                  ? <button onClick={()=>handleConfirm(booking?._id)} className="btn btn-sm bg-red-500 text-white">Pending...</button>
                  : <span className="bg-red-500 text-black p-2 text-md rounded-lg">Pending...</span>
                }
                </>
              
               
              }
            </th>
            <th>
              <button onClick={()=>handleRemove(booking?._id)} className="btn bg-gradient-to-r from-purple-700 to-blue-300 text-white btn-md text-md">Return</button>
            </th>
          </tr>
        )
      }
        </>
      }
      
     
    </tbody>    
  </table>
  :
  <div className="w-full flex flex-col items-center py-8 md:py-12 ">
    <h1 className="bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text w-fit text-4xl md:text-6xl lg:text-8xl font-bold">Empty Cart !</h1>
    <img src="https://i.ibb.co/7QgbJtW/empty-cart-removebg-preview.png" alt="" />
  </div>
  }
  
</div>
    </div>
    );
};

export default Borrow;
