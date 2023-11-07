import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from 'react-router-dom';
import { RotatingLines } from  'react-loader-spinner'
const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation();
    if(loading){
        return <div className='h-[80vh] flex items-center justify-center'>
            <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="150"
            visible={true}
            />
            {/* <span className="loading loading-bars loading-lg"></span> */}
        </div>
    }
    if(user){
        return children;
    }
    return (
    <Navigate state={location.pathname} to="/signin"></Navigate>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;