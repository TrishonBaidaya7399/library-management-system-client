import PropTypes from 'prop-types';
// import { RiDeleteBin5Fill } from 'react-icons/ri';
import { NavLink, useLoaderData } from 'react-router-dom';
import bannerVideo from "../../images/Images/bg video.mp4";
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const AllBooks = () => {
  const { isAdmin }= useContext(AuthContext);
  const allLoadedBooks = useLoaderData();
  const [loadedBooks, setLoadedBooks] = useState(allLoadedBooks)
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Initial category filter
  const initialBookCount = 12;
 
  if(isAdmin === true){
    console.log('admin Id');
  }
  const filteredBooks = showAllBooks
    ? loadedBooks
    : loadedBooks.slice(0, initialBookCount);

  const filteredBooksByCategory =
    selectedCategory === "All"
      ? filteredBooks
      : filteredBooks.filter(
          (book) =>
            selectedCategory === "Available"
              ? book.quantity > 0
              : book.category === selectedCategory
        );

  const toggleShowAllBooks = () => {
    setShowAllBooks(!showAllBooks);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        fetch(`https://library-management-system-server-phi.vercel.app/books/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              const updatedBooks = filteredBooksByCategory.filter((book) => book._id !== id);
              setLoadedBooks(updatedBooks);
              Swal.fire({
                title: "Deleted!",
                text: "That thing is still around?",
                icon: "success"
              });
              const remaining = loadedBooks.filter(book => book._id !== id);
              setLoadedBooks(remaining);

            } else {
              Swal.fire({
                title: "Failed!",
                text: "Delete operation failed",
                icon: "error"
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Failed!",
              text: error.message,
              icon: "error"
            });
          });
      }
    });
  };
  

  return (
    <>
      <div className="App ">
      <div
          style={{
            position: 'relative',
            width: '100%',
            height: '80vh',
            overflow: 'hidden',
            textAlign: 'center',
          }}
          className="video-container rounded-xl hidden md:block"
        >
          <video
            className='rounded-xl'
            autoPlay
            loop
            muted
            style={{ width: '100%', height: '80vh' }}
          >
            <source
              src={bannerVideo}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              zIndex: 2,
            }}
            className="video-content"
          >
            <h1 className='bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text text-4xl md:text-8xl font-bold w-fit mx-auto'>All Category Books</h1>
            <p className='pt-6 text-xl font-bold hidden lg:block'>
              Life is a drama, and we are all actors on its stage, playing our parts with passion and purpose, sometimes with tears, and sometimes with laughter.
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '80vh',
              background: 'rgba(0, 0, 0, 0.8)',
              zIndex: 1,
            }}
            className="overlay"
          ></div>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <h1 className="bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text text-4xl md:text-6xl font-bold w-fit text-center py-6 lg:py-12">All Books</h1>

        {/* Category Filter Dropdown */}
        <div className="mb-4">
          <label className="text-md lg:text-xl font-semibold">Filter by Category: </label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="bg-gray-100 text-gray-600 border rounded-md text-sm p-1 lg:p-2"
          >
            <option value="Available">Available Books</option>
            <option value="All">All Books</option>
            <option value="Novel">Novel Books</option>
            <option value="Thriller">Thriller Books</option>
            <option value="Religious">Religious Books</option>
          </select>
        </div>
{/*  */}
  {
    filteredBooksByCategory.length>0
    ? <>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-[20px] md:mx-[50px] lg:mx-[100px] mb-12 '>
          {filteredBooksByCategory.map((book, idx) => (
           <div key={idx} className="drop-shadow-lg text-center w-[300px] border-2 border-gray-400 p-4  rounded-md">
           <div className="prod-img bg-gray-400 w-full h-[200px] mx-auto rounded-lg">
             <img className="h-full w-full rounded-lg" src={book?.photo} alt="" />
           </div>
           <div className="content">
             <div className="description text-center my-4">
               <h1 className='text-md text-purple-700 font-extrabold'>{book?.name}</h1>
               <h1 className='text-sm text-blue-500 font-semibold'>Author: {book?.authorname}</h1>
               <p className='text-sm'><span>Category: </span>{book?.category}</p>
               <p className='text-sm'><span>Quantity: </span>{book?.quantity}</p>
               <p className='text-sm'><span>Price: $</span>{book?.price}</p>
               <div className="rating">
                 {Array.from({ length: 5 }).map((_, index) => (
                   <input
                     key={index}
                     type="radio"
                     name={`rating-${book?._id}`}
                     className="mask mask-star-2 bg-orange-400"
                     checked={index < book?.rating}
                     readOnly
                   />
                 ))}
               </div>
             </div>
             <div className="flex gap-4 ">
                 <div className='w-1/3'>
                     <NavLink to={`/bookdetails/${book?._id}`}><p className='text-xl bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text w-fit hover:text-xl bg-gradient-to-l duration-500 font-semibold w-full' id={book?._id}>Details</p></NavLink>
                 </div>
                 {
                  isAdmin
                  ? <>
                  <div className='w-1/3'>
                 {/* /${book?._id} */}
                     <NavLink to={`/updatebook/${book?._id}`}><p className='text-xl bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text w-fit hover:text-xl bg-gradient-to-l duration-500 font-semibold w-full' id={book?._id}>Update</p></NavLink>
                 </div>
                 <div className='w-1/3'>
                 <NavLink onClick={()=>handleDelete(book?._id)} to={`#`}><p className='text-xl text-red-500 hover:text-xl bg-gradient-to-l duration-500 font-semibold w-full' id={book?._id}>Delete</p></NavLink>
                 </div>
                  </>
                  : ''
                 }
             </div>
           </div>
         </div>
          ))}
        </div>

        {loadedBooks.length > initialBookCount && (
          <button
            className="bg-gradient-to-r from-purple-600 to-blue-400 text-white font-semibold py-4 rounded-lg text-xl mt-8 w-[300px] mb-12"
            onClick={toggleShowAllBooks}
          >
            {showAllBooks ? 'Show Less' : 'See All'}
          </button>
        )}
    </>
    : 
    <div className="w-full flex flex-col items-center py-8 md:py-12 ">
    <h1 className="bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text w-fit text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Books are not available!</h1>
    <img src="https://i.ibb.co/kxmG7VD/no-record.png" alt="" />
  </div>
  }
        
      </div>
    </>
  );
};

AllBooks.propTypes = {
  book: PropTypes.node,
};

export default AllBooks;
