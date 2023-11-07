// import PropTypes from 'prop-types';

import { useLoaderData } from "react-router-dom";
import AboutPart from "../../Component/About section/AboutPart";
import Banner from "../../Component/Banner Slider/Banner";
import Categories from "../../Component/Book Categories/Categories";
import Featured from "../../Component/Featured/Featured";
import PopularBooks from "../../Component/Popular Books/PopularBooks";

const Home = () => {
    const allbooks = useLoaderData()
    const books = allbooks.filter((books)=> books.ratings >=4);
    console.log(books);
    return (
        <div>
           <Banner/>
           <AboutPart/>
           <Categories/>
           <PopularBooks books={books}/>
           <Featured/>
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;