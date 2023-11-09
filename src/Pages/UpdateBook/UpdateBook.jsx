import PropTypes from 'prop-types';
import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';
import bookImg from "../../images/Images/book.png"

const UpdateBook = () => {
    const books = useLoaderData();
    const {_id,pdf, name, authorname, photo, price, quantity, description, rating, category} = books;
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const authorname = form.authorname.value;
        const photo = form.photo.value;
        const pdf = form.pdf.value;
        const category = form.category.value;
        const price = form.price.value;
        const description = form.description.value;
        const rating = form.rating.value;
        const quantityStr = form.quantity.value;
        const quantity = parseInt(quantityStr);
        const updatedBook = {photo, name, authorname, price, quantity, description, rating, category,pdf}
        console.log('Name: ' + name);
        console.log('Photo URL: ' + photo);
        console.log('Category: ' + category);
        console.log('Price: ' + price);
        console.log('Description: ' + description);
        console.log('Rating: ' + rating);
        console.log('Quantity:' , quantity);
        console.log('Added New product details:' , updatedBook);


        // send data to the server
        fetch(`https://library-management-system-server-phi.vercel.app/books/${_id}`,{
            method: "PUT",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(updatedBook)
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount> 0){
                Swal.fire({
                    title: 'Updated!',
                    text: 'Book updated Successfully!',
                    imageUrl: photo ? photo : bookImg,
                    imageWidth: 200,
                    imageHeight: 300,
                    imageAlt: "Custom image",
                  })
                form.reset();
            }
        })
        .catch(error =>{
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Exit'
              })
        })
    };


    return (
        <div className="py-[20px] md:pb-[70px]">
            <div className="bg-gray-200 w-[80%] mx-auto mt-[50px] py-[20px] md:py-[70px] rounded-lg">
                <h1 className="text-center bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text text-6xl font-bold w-fit pb-6 mx-auto">Update Book</h1>
                <form onSubmit={handleUpdate} className="w-[80%] mx-auto">
                    <div className='flex gap-8'>
                        <div className='w-full'>
                            <div className="mt-6">
                            <h1 className="text-gray-600 text-xl font-semibold">Cover Photo URL</h1>
                            <input type="text" name="photo" id="photo" required placeholder="Enter Books Photo URL" defaultValue={photo} className="text-gray-600 w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                            </div>
                            <div className="mt-6">
                            <h1 className="text-gray-600 text-xl font-semibold">PDF URL</h1>
                            <input type="text" name="pdf" id="pdf" required placeholder="Enter Books Photo URL" defaultValue={pdf} className="text-gray-600 w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                            </div>
                            <div className="mt-6">
                            <h1 className="text-gray-600 text-xl font-semibold">Cover Name</h1>
                            <input type="text" name="name" id="name" required defaultValue={name}   placeholder="Enter Books Name" className="text-gray-600 w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                            </div>
                           
                        </div>
                        <div className="photo w-[300px] h-[250px] hidden md:block">
                            <img className='border-[5px] h-full border-purple-700 rounded-lg p-2' src={photo} alt="" />
                        </div>
                    </div>
                    <div className="mt-6">
                            <h1 className="text-gray-600 text-xl font-semibold">Author Name</h1>
                            <input type="text" name="authorname" id="authorname" required defaultValue={authorname} placeholder="Enter Books Name" className="text-gray-600 w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                            </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Price</h1>
                        <input type="number" name="price" id="price" required defaultValue={price} placeholder="Enter Books Price" className="text-gray-600 w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Quantity</h1>
                        <input type="number" name="quantity" id="quantity" required defaultValue={quantity} placeholder="Enter Books quantity" className="text-gray-600 w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Description</h1>
                        <textarea rows={8} type="text" name="description" id="description" required defaultValue={description} placeholder="Enter Books Description" className="text-gray-600 w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Rating</h1>
                        <div className="flex gap-2">
                        <label>
                            {/* onChange={handleRating} */}
                                <input type="radio" name="rating" value="1"  checked={rating === rating}  />
                                
                            </label>
                            <label>
                                <input type="radio" name="rating" value="2"  checked={rating === rating}  />
                               
                            </label>
                            <label>
                                <input type="radio" name="rating" value="3" checked={rating === rating}  />
                              
                            </label>
                            <label>
                                <input type="radio" name="rating" value="4" checked={rating === rating}  />
                          
                            </label>
                            <label>
                                <input type="radio" name="rating" value="5" checked={rating === rating}  />
                            </label>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row">
                        <div className="w-1/2">
                            <h1 className="text-gray-600 text-xl font-semibold">Category</h1>
                            <label>
                                {/* onChange={handleCategoryChange} */}
                                <input type="radio" name="category" value="Novel"  checked={category === category} />
                               <span className="text-gray-600 pl-4">Novel</span> 
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Thriller" checked={category === category} />
                               <span className="text-gray-600 pl-4">Thriller</span> 
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="History" checked={category === category} />
                               <span className="text-gray-600 pl-4">History</span> 
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Drama" checked={category === category} />
                               <span className="text-gray-600 pl-4">Drama</span> 
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Sci-Fi"  checked={category === category} />
                              <span className="text-gray-600 pl-4">Sci-Fi</span> 
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Religious"  checked={category === category} />
                              <span className="text-gray-600 pl-4">Religious</span> 
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Update Book" className="w-full mt-6 rounded-md py-4 text-center text-white font-bold bg-gradient-to-r from-purple-700 to-blue-300 hover:bg-gradient-to-l transition-all duration-200" />
                </form>
            </div>
        </div>
    );
};

UpdateBook.propTypes = {
    books:PropTypes.node,    
};
export default UpdateBook;


