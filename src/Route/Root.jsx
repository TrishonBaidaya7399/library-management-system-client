// import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Navbar from '../Component/Shared/Navbar';
import Footer from '../Component/Shared/Footer';

const Root = () => {
    return (
        <div className='overflow-hidden font-serif'>
            <Navbar/>
            <Outlet></Outlet>
            <Footer/>
        </div>
    );
};

Root.propTypes = {
    
};

export default Root;