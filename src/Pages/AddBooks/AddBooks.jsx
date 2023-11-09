import { useState } from 'react';
import Swal from 'sweetalert2'


const AddBooks = () => {
    const [category, setCategory] = useState(''); 
    const [rating, setRating] = useState(''); 

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleRating = (e) => {
        setRating(e.target.value);
    };


    const handleAdd = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const authorname = form.authorname.value;
        const photo = form.photo.value;
        const pdf = form.pdf.value;
        const category = form.category.value;
        const price = form.price.value;
        const quantityStr = form.quantity.value;
        const quantity = parseInt(quantityStr);
        const description = form.description.value;
        const rating = form.rating.value;
        const newBook = {photo, name, authorname, price, quantity, description, rating, category, pdf}
        console.log('Name: ' + name);
        console.log('Photo URL: ' + photo);
        console.log('Category: ' + category);
        console.log('Price: ' + price);
        console.log('Description: ' + description);
        console.log('Rating: ' + rating);
        console.log('Added New product details:' , newBook);


        // send data to the server
        fetch('https://library-management-system-server-phi.vercel.app/books',{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(newBook)
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'New Book added Successfully!',
                    icon: 'success',
                    confirmButtonText: 'close'
                  })
                form.reset();
            }
        })
    };

    return (
        <div className="py-[20px] md:pb-[70px]">
            <div className="bg-gray-200 w-[80%] mx-auto mt-[50px] py-[20px] md:py-[70px] rounded-lg">
                <h1 className="text-center bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text text-6xl font-bold w-fit pb-6 mx-auto">Add New Book</h1>
                <form onSubmit={handleAdd} className="w-[95%] md:w-[80%] mx-auto text-gray-600">
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Cover Photo URL</h1>
                        <input type="text" name="photo" id="photo" required placeholder="Enter Books Photo URL" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">PDF URL</h1>
                        <input type="text" name="pdf" id="pdf" required placeholder="Enter Books Photo URL" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Cover Name</h1>
                        <input type="text" name="name" id="name" required placeholder="Enter Books Name" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Author Name</h1>
                        <input type="text" name="authorname" id="authorname" required placeholder="Enter Books Name" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Price</h1>
                        <input type="number" name="price" id="price" required placeholder="Enter Books Price" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Quantity</h1>
                        <input type="number" name="quantity" id="quantity" required placeholder="Enter Books quantity" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Description</h1>
                        <input type="text" name="description" id="description" required placeholder="Enter Books Description" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Rating</h1>
                        <div className="flex gap-2">
                            <label>
                                <input type="radio" name="rating" value="1"   checked={rating === '1'}  onChange={handleRating}/>
                               
                            </label>
                            <label>
                                <input type="radio" name="rating" value="2"   checked={rating === '2'}  onChange={handleRating}/>
                               
                            </label>
                            <label>
                                <input type="radio" name="rating" value="3"  checked={rating === '3'}  onChange={handleRating}/>
                              
                            </label>
                            <label>
                                <input type="radio" name="rating" value="4"  checked={rating === '4'}  onChange={handleRating}/>
                          
                            </label>
                            <label>
                                <input type="radio" name="rating" value="5"  checked={rating === '5'}  onChange={handleRating}/>
                            </label>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row">
                        <div className="w-1/2">
                            <h1 className="text-gray-600 text-xl font-semibold">Category</h1>
                            <label>
                                
                                <input type="radio" name="category" value="Novel" checked={category === 'Novel'} onChange={handleCategoryChange}/>
                                <span className="text-gray-500 pl-2 front-bold">Novel</span>
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Thriller" checked={category === 'Thriller'} onChange={handleCategoryChange}/>
                                <span className="text-gray-500 pl-2 front-bold">Thriller</span>
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="History" checked={category === 'History'} onChange={handleCategoryChange}/>
                                <span className="text-gray-500 pl-2 front-bold">History</span>
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Drama" checked={category === 'Drama'} onChange={handleCategoryChange}/>
                                <span className="text-gray-500 pl-2 front-bold">Drama</span>
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Sci-Fi"  checked={category === 'Sci-Fi'} onChange={handleCategoryChange}/>
                                <span className="text-gray-500 pl-2 front-bold">Sci-Fi</span>
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Religious"  checked={category === 'Religious'} onChange={handleCategoryChange}/>
                                <span className="text-gray-500 pl-2 front-bold">Religious</span>
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Add Book" className="w-full mt-6 rounded-md py-4 text-center text-white font-bold bg-gradient-to-r from-purple-700 to-blue-300 hover:bg-gradient-to-l transition-all duration-200" />
                </form>
            </div>
        </div>
    );
};

export default AddBooks;
