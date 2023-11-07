import PropTypes from 'prop-types';
import Book from '../Book/Book';

const Books = ({books, category}) => {
    console.log(books);
    return (
        <div className='flex flex-col items-center'>
        
         {
            books.length >0 
            ? 
            <>
             <h1 className="bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text text-4xl md:text-6xl font-bold w-fit text-center py-12">Available Books of {category}</h1>
             <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-[20px] md:mx-[50px] lg:mx-[100px] '>
            {
                books.map((book, idx) => <Book key={idx} book={book}></Book>)
            }
            </div>
            </>
             : 
            <div className="flex items-center justify-center">
               <img className='w-[100%] py-8' src="https://i.ibb.co/vJ2sgJq/product-not-found-removebg-preview.png" alt="" />
            </div>
        }   
        
        </div>
    );
};

Books.propTypes = {
    books: PropTypes.node,
    category: PropTypes.string,
};

export default Books;