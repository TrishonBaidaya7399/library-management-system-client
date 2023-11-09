import { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Link, useLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const BookDetails = () => {
  const [modalHidden, setModalHidden] = useState(false);
  const [isBookAlreadyBorrowed, setIsBookAlreadyBorrowed] = useState(false);
  const book = useLoaderData();
  const [quantity, setquantity] = useState(book?.quantity)
  const { user, loading } = useContext(AuthContext);
  const [, setBorrowedBooks] = useState([]);

  // Function to fetch the user's borrowed books
  const fetchBorrowedBooks = () => {
    if (user && !loading) {
      fetch(`https://library-management-system-server-phi.vercel.app/borrowed?email=${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          setBorrowedBooks(data);
          const bookIsBorrowed = data.some((borrowedBook) => borrowedBook.id === book._id);
          setIsBookAlreadyBorrowed(bookIsBorrowed);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (user && !loading) {
      fetchBorrowedBooks();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const handleBorrow = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const email = form.email.value;

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const borrowData = `${year}-${month}-${day}`;

    const returnDate = form.date.value;
    const id = book._id;
    const photo = book.photo;
    const title = book.name;
    const category = book.category;
    const borrow = { userName, email, returnDate, id, photo, title, category, borrowData };
    console.log(borrow);

    setModalHidden(true);
    if (!isBookAlreadyBorrowed) {
      // Only allow borrowing if the book is not already borrowed
      Swal.fire({
        title: 'Borrow Confirmation',
        text: 'Are you sure you want to borrow this book?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, Borrow',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        setModalHidden(false);
        if (result.isConfirmed) {
          fetch('https://library-management-system-server-phi.vercel.app/borrowed', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(borrow),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
                setModalHidden(false);
                Swal.fire({
                  title: 'Success!',
                  text: 'Your request to borrow this book has been sent to admin. Please check your Borrowed Book section. When your request will be approved, it will show as APPROVED!',
                  imageUrl: book?.photo,
                  imageWidth: 300,
                  imageHeight: 350,
                  imageAlt: 'Custom image',
                  confirmButtonText: 'Ok!',
                });
               
                console.log("Prev Book Quantity",book?.quantity);
                // send decreased quantity to the server
                fetch(`https://library-management-system-server-phi.vercel.app/books/${book?._id}`,{
                    method: "PATCH",
                    headers: {
                      "content-type":"application/json"
                    },
                    body: JSON.stringify({quantity:book?.quantity})//------------solved
                  })
                .then(res=> res.json())
                .then(data => {
                console.log(data + "quantity changed: " + book?.quantity);
                setquantity(book?.quantity -1)
                })
                setIsBookAlreadyBorrowed(true);
              }
            })
            .catch((error) => {
              setModalHidden(false);
              Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok!',
              });
            });
        }
      });
    }
  };

  return (
    <div className="">
      <div className="drop-shadow-lg lg:h-[100vh] bg-gray-200 my-[50px] mx-[20px] md:mx-[50px] lg:mx-[100px] grid  grid-cols-1 lg:grid-cols-3 p-4 md:-p-8 lg:p-12">
        <div className="prod-img mx-auto col-span-1 w-[300px] h-[400px] mb-[130px] lg:mb-0">
          <img className="mt-[20px] md:mt-[30px] rounded-t-lg h-full w-full border-[5px] border-blue-400" src={book?.photo} alt="" />
          <div className="flex items-center justify-center flex justify-between mt-12">
            <Link className="/">
              <button
                onClick={() => document.getElementById('my_modal_3').showModal()}
                className={`text-white font-bold text-xl bg-gradient-to-r from-purple-700 to-blue-400 rounded-full px-6 py-2 mb-12 ${isBookAlreadyBorrowed ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isBookAlreadyBorrowed ? 'Borrowed' : 'Borrow'}
              </button>
            </Link>
            <Link to={book?.pdf} className="text-white font-bold text-xl bg-gradient-to-r from-purple-700 to-blue-400 rounded-full px-6 py-2 mb-12">Read</Link>
          </div>
        </div>
        <div className="description p-4 text-start space-y-3 mt-4 col-span-2">
          <h1 className='bg-gradient-to-r from-purple-700 to-blue-400 text-transparent bg-clip-text text-4xl font-bold w-fit'>Title: {book?.name}</h1>
          <h1 className='text-xl font-semibold text-gray-600'>Writer: {book?.authorname}</h1>
          <p className='text-lg font-semibold text-gray-500'><span className="text-gray-600 font-bold">Category:</span> {book?.category}</p>
          <p className='text-lg font-semibold text-gray-500'><span className="text-gray-600 font-bold">Price:</span> ${book?.price}</p>
          <p className='text-lg font-semibold text-gray-500'><span className="text-gray-600 font-bold">Quantity:</span> {quantity > 0 ? quantity : <span className='text-red-500 font-bold'>Unavailable</span>} books</p>
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
      {modalHidden === false && (
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-base-300">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-purple-600 font-extrabold text-xl">✕</button>
            </form>
            <form onSubmit={handleBorrow} className='text-gray-500'>
              <img className='w-[200px] h-[250px] mx-auto border-[5px] border-purple-700 p-1 rounded-lg' src={book?.photo} alt="" />
              <h1 className='bg-gradient-to-r from-purple-700 to-blue-400 text-transparent bg-clip-text pt-2 text-3xl font-bold w-fit mx-auto'>{book?.name}</h1>
              {book?.quantity === 0 ? <p className='text-red-500 font-bold pt-4 text-center text-xl'>Unavailable</p> : ''}
              <div className="mt-6">
                <h1 className="text-gray-600 text-xl font-semibold">User Name</h1>
                <input type="text" name="name" id="name" required placeholder="Enter Your Name" defaultValue={user?.displayName} className="w-full bg-white border-2 border-white hover-border-gray-300 mt-4 p-3 rounded-md duration-200" />
              </div>
              <div className="mt-6">
                <h1 className="text-gray-600 text-xl font-semibold">User Email</h1>
                <input type="email" name="email" id="email" required placeholder="Enter Your Email" defaultValue={user?.email} className="w-full bg-white border-2 border-white hover-border-gray-300 mt-4 p-3 rounded-md duration-200" />
              </div>
              <div className="mt-6">
                <h1 className="text-gray-600 text-xl font-semibold">Return Date</h1>
                <input type="date" name="date" id="date" required placeholder="Enter Your Returning Date" className="w-full bg-white border-2 border-white hover-border-gray-300 mt-4 p-3 rounded-md duration-200" />
              </div>
              <div className="mt-6 flex gap-12">
                <input type="submit" value="Borrow" disabled={quantity <= 0 || isBookAlreadyBorrowed} className="btn text-xl bg-gradient-to-r from-purple-700 to-blue-400 rounded-lg text-white text-center w-full" />
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default BookDetails;



