// import { useState } from 'react';
// import Swal from 'sweetalert2'

// const bgStyle = {
//     // backgroundImage: `url(${backgroundImage01})`,
//     backGroundSize: 'cover'
// };

const UpdateBook = () => {
    // const [category, setCategory] = useState(''); // State for category selection
    // const [brand, setBrand] = useState(''); // State for brand selection
    // const [rating, setRating] = useState(''); // State for brand selection

    // const handleCategoryChange = (e) => {
    //     setCategory(e.target.value);
    // };
    // const handleRating = (e) => {
    //     setRating(e.target.value);
    // };

    // const handleBrandChange = (e) => {
    //     setBrand(e.target.value);
    // };

    // const handleAdd = (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const name = form.name.value;
    //     const authorname = form.authorname.value;
    //     const photo = form.photo.value;
    //     const brand = form.brand.value;
    //     const category = form.category.value;
    //     const price = form.price.value;
    //     const quantity = form.quantity.value;
    //     const description = form.description.value;
    //     const rating = form.rating.value;
    //     const newProduct = {photo, name, price, quantity, description, rating, category, brand}
    //     console.log('Name: ' + name);
    //     console.log('Photo URL: ' + photo);
    //     console.log('Brand: ' + brand);
    //     console.log('Category: ' + category);
    //     console.log('Price: ' + price);
    //     console.log('Description: ' + description);
    //     console.log('Rating: ' + rating);
    //     console.log('Added New product details:' , newProduct);


    //     // send data to the server
    //     fetch('https://electro-mart-server-ten.vercel.app/product',{
    //         method: "POST",
    //         headers: {
    //             "content-type":"application/json"
    //         },
    //         body: JSON.stringify(newProduct)
    //     })
    //     .then(res=> res.json())
    //     .then(data => {
    //         console.log(data);
    //         if(data.insertedId){
    //             Swal.fire({
    //                 title: 'Success!',
    //                 text: 'Product added Successfully!',
    //                 icon: 'success',
    //                 confirmButtonText: 'close'
    //               })
    //             form.reset();
    //         }
    //     })
    // };

    return (
        <div className="py-[20px] md:pb-[70px]">
            <div className="bg-gray-200 w-[80%] mx-auto mt-[50px] py-[20px] md:py-[70px] rounded-lg">
                <h1 className="text-center bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text text-6xl font-bold w-fit pb-6 mx-auto">Update Book</h1>
                <form  className="w-[80%] mx-auto">
                    <div className="mt-6">
                        <h1 className="text-gray-600 text-xl font-semibold">Cover Photo URL</h1>
                        <input type="text" name="photo" id="photo" required placeholder="Enter Books Photo URL" className="w-full bg-white border-2 border-white hover:border-gray-300 mt-4 p-3 rounded-md duration-200" />
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
                                <input type="radio" name="rating" value="1"  />
                                {/* checked={rating === '1'}  onChange={handleRating} */}
                            </label>
                            <label>
                                <input type="radio" name="rating" value="2"  />
                               
                            </label>
                            <label>
                                <input type="radio" name="rating" value="3" />
                              
                            </label>
                            <label>
                                <input type="radio" name="rating" value="4" />
                          
                            </label>
                            <label>
                                <input type="radio" name="rating" value="5" />
                            </label>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row">
                        <div className="w-1/2">
                            <h1 className="text-gray-600 text-xl font-semibold">Category</h1>
                            <label>
                                {/* checked={category === 'Computer'} onChange={handleCategoryChange} */}
                                <input type="radio" name="category" value="Novel"  />
                                Novel
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Thriller" />
                                Thriller
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="History" />
                                History
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Drama" />
                                Drama
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Sci-Fi"  />
                               Sci-Fi
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="category" value="Religious"  />
                               Religious
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Update Book" className="w-full mt-6 rounded-md py-4 text-center text-white font-bold bg-gradient-to-r from-purple-700 to-blue-300 hover:bg-gradient-to-l transition-all duration-200" />
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;
