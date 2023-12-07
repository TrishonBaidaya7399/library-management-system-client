import PropTypes from 'prop-types';
import { useContext } from 'react';

import { NavLink } from "react-router-dom";
import { AuthContext } from '../../Provider/AuthProvider';

const Book = ({book}) => {
    const {isAdmin} = useContext(AuthContext)
return (
<div className="pb-6">
        <div className="drop-shadow-lg text-center w-[280px] h-[460px] border-2 border-gray-400 p-4  rounded-md">
            <div className="prod-img rounded-lg bg-gray-400 w-full h-[200px] mx-auto">
            <img className="h-full w-full rounded-lg" src={book?.photo} alt="" />
            </div>
            <div className="description p-0 text-start my-4">
                <h1 className='text-md text-purple-700 font-extrabold'>{book?.name}</h1>
                <h1 className='text-sm text-blue-500 font-semibold'>Author: {book?.authorname}</h1>
                <p className='text-sm'><span>Category: </span>{book?.category}</p>
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
            <div className="flex gap-4">
                <div className='w-1/2'>
                <NavLink to={`/bookdetails/${book?._id}`}><button className='btn bg-gradient-to-r from-purple-700 to-blue-400 hover:bg-gradient-to-l duration-500  text-white ho font-semibold w-full' id={book?._id}>Details</button></NavLink>
                </div>
                {
                    isAdmin 
                    ?   <div className='w-1/2'>
                    {/* /${book?._id} */}
                <NavLink to={`/updatebook`}><button className='btn bg-gradient-to-r from-purple-700 to-blue-400 hover:bg-gradient-to-l duration-500  text-white ho font-semibold w-full' id={book?._id}>Update</button></NavLink>
                </div>
                    : ''
                }
              
            </div>
        </div>
</div>
            
    );
};

Book.propTypes = {
    book: PropTypes.node,
};

export default Book;