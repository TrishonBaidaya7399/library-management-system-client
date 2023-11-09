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
             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-[20px] md:mx-[50px] lg:mx-[100px] '>
            {
                books.map((book, idx) => <Book key={idx} book={book}></Book>)
            }
            </div>
            </>
             : 
             <div className="w-full flex flex-col items-center py-8 md:py-12 ">
                <h1 className="bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text w-fit text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Books are not available!</h1>
                <img src="https://i.ibb.co/kxmG7VD/no-record.png" alt="" />
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