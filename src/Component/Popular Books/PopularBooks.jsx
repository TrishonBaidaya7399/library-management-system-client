import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./style.css"
import { useEffect } from 'react';

const PopularBooks = () => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    fetch("https://library-management-system-server-phi.vercel.app/books")
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        console.log(data);
      });
  }, []); 
  const popularBooks = books.filter((book) => book?.rating >= 4);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  };

  return (
    <div>
      <h1 className="text-4xl md:text-6xl text-center font-bold font-serif bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text text-4xl font-bold w-fit mx-auto pb-4">Popular Books</h1>
      <p className="text-lg text-center font-bold font-serif pb-6">Choose from popular books</p>
      <Slider className="rounded-xl mb-12 mx-[20px] md:mx-[50px] lg:mx-[100px]  px-[30px] lg:px-[100px]" {...settings}>
        {popularBooks.map((book, idx) => (
          <div key={idx} className="z-10 px-2 py-3 items-center justify-center flex flex-col card space-y-3">
            <div className='w-[150px] h-[200px] border-2 border-gray-200 rounded-lg shadow-lg'>
              <img className='w-full h-full' src={book?.photo} alt="" />
            </div>
            <h1 className='text-xl font-bold text-purple-700'>{book?.name}</h1>
            <h1 className='font-bold text-blue-400'>{book?.authorname}</h1>
            <div className="flex opacity-90">
              {Array.from({ length: book?.rating }, (_, index) => (
                <AiFillStar key={index} className="text-[30px] text-orange-500" />
              ))}
            </div>
            <Link to={`/bookdetails/${book?._id}`} className='text-purple-500'>Details</Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

PopularBooks.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

export default PopularBooks;
