// import PropTypes from 'prop-types';
// import Swal from 'sweetalert2'
// import { Link, useLoaderData, useNavigate } from "react-router-dom";
// import { saveAddToCart } from '../../../Utility/localstorage';
import { AiFillStar } from 'react-icons/ai';
import { Link, useLoaderData } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../Provider/AuthProvider";


const BookDetails = () => {
    // const navigate = useNavigate(); 
    const book = useLoaderData();
    console.log(book);
    // const {user,loading} = useContext(AuthContext);
    const {loading} = useContext(AuthContext);
    if(loading){
      return <span className="loading loading-bars loading-lg"></span>
  }


// const handleAddToCart = async (productId) => {
//  const userId= user._id; 
//  console.log(productId);
//   const productData = {
//     productId: productId,
//     userId: userId ,
//   };

//   try {
//     const response = await fetch('https://electro-mart-server-ten.vercel.app/cartitems', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(productData),
//     });

//     if (response.ok) {
//       Swal.fire({
//         title: 'Success!',
//         text: 'Product added to cart successfully!',
//         icon: 'success',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Go to cart',
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate('/addtocart');
//         }
//       });
//     } else {
//       // Handle error
//       console.error('Failed to add the product to the cart');
//     }
//   } catch (error) {
//     // Handle fetch error
//     console.error(error);
//   }
// };

    return (
        <div className="">
        <div className="drop-shadow-lg lg:h-[100vh] bg-gray-200 my-[50px] mx-[20px] md:mx-[50px] lg:mx-[100px] grid  grid-cols-1 lg:grid-cols-3 p-4 md:-p-8 lg:p-12">
        <div className="prod-img mx-auto col-span-1 w-[300px] h-[400px] mb-[130px] lg:mb-0">
        <img className=" mt-[20px] md:mt-[30px] rounded-t-lg  h-full w-full border-[5px] border-blue-400" src={book?.photo} alt="" />
        <div className=" flex items-center justify-center flex justify-between mt-12">
        <Link className="/">
        {/* onClick={()=>handleAddToCart(product._id)} */}
        <button onClick={()=>document.getElementById('my_modal_3').showModal()} className="text-white font-bold text-xl bg-gradient-to-r from-purple-700 to-blue-400 rounded-full px-6 py-2 mb-12">Borrow</button>
        </Link>
        <Link to='#' className="text-white font-bold text-xl bg-gradient-to-r from-purple-700 to-blue-400 rounded-full px-6 py-2 mb-12">Read Book</Link>
        </div>
        </div>
        <div className="description p-4 text-start space-y-3 mt-4 col-span-2">
            <h1 className='bg-gradient-to-r from-purple-700 to-blue-400 text-transparent bg-clip-text text-4xl font-bold w-fit'>Title: {book?.name}</h1>
            <h1 className='text-xl font-semibold text-gray-600'>Writer: {book?.authorname}</h1>
            <p className='text-lg font-semibold text-gray-500'><span className="text-gray-600 font-bold">Category:</span> {book?.category}</p>
            <p className='text-lg font-semibold text-gray-500'><span className="text-gray-600 font-bold">Price:</span> ${book?.price}</p>
            <p className='text-lg font-semibold text-gray-500'><span className="text-gray-600 font-bold">Quantity:</span> {book?.quantity} books avalable</p>
            <div className="rating flex items-center">
            <p className='text-lg font-semibold mr-2 text-gray-600 font-bold'>Ratings: </p>
                {Array.from({ length: book.rating }).map((_, index) => (
                  <AiFillStar key={index} className='text-xl text-orange-500'/>
              ))}
            </div>
            <p className='text-gray-500'><span className="text-lg font-semibold text-gray-600">Description: </span></p>
            <div className="overflow-auto max-h-48 text-gray-500">{book?.description}</div>
        </div>
    </div>
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_3" className="modal">
  <div className="modal-box bg-base-300">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-purple-600 font-extrabold text-xl">✕</button>
    </form>
    <form className='text-gray-500'>
    <div className="mt-6">
        <h1 className="text-gray-600 text-xl font-semibold">User Name</h1>
        <input type="text" name="name" id="name" required placeholder="Enter Your Name"  defaultValue="Trishon Baidaya" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
    </div>
    <div className="mt-6">
        <h1 className="text-gray-600 text-xl font-semibold">User Email</h1>
        <input type="email" name="email" id="email" required placeholder="Enter Your Email"  defaultValue="shukantobaidya2018@gmail.com" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
    </div>
    <div className="mt-6">
        <h1 className="text-gray-600 text-xl font-semibold">Return Date</h1>
        <input type="date" name="return" id="return" required placeholder="Enter Your Returning Date"  defaultValue="shukantobaidya2018@gmail.com" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
    </div>
    <div className="mt-6 flex gap-12">
    <input type="submit" value="Borrow" className="btn text-xl bg-gradient-to-r from-purple-700 to-blue-400 rounded-lg text-white text-center w-full" />
    </div>
    </form>                
  </div>
</dialog>
        </div>
    );
};

BookDetails.propTypes = {
    
};

export default BookDetails;