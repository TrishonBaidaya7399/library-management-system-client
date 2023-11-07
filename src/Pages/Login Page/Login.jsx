// import PropTypes from 'prop-types';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import loginBanner from "../../images/Images/login.png"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
// import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const {signInUser, signInWithGoogle} = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleLogin = e =>{
    e.preventDefault();
    setLoading(true);
    setError(null)
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email);
    signInUser(email, password)
    .then(result=> {
      const loggedInUser = result.user;
      console.log(loggedInUser)
      // const user = { email }
      //get access token
      // axios.post(`https://car-doctor-server-omega-nine.vercel.app/jwt`, user)
      // .then(res =>{
      //   console.log(res.data);
      // })
      setLoading(false)

      Swal.fire({
        title: 'Logged in!',
        text: `${loggedInUser?.displayName ? loggedInUser.displayName : 'User'} logged in successfully!`,
        imageUrl: loggedInUser?.photoURL ? loggedInUser.photoURL : 'https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
        showConfirmButton: false,
        timer: 1500,
      })
      form.reset();
      navigate(location?.state ? location?.state : '/');

    })
    .catch(error=>{
      setLoading(false)
      console.log(error.message);
      setError(error.message)
      Swal.fire({
        title: 'Login Failed!',
        text: `${error.message}`,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  const handleGoogleSignIn = e =>{
    e.preventDefault();
    setLoading(true)
    setError(null);
    signInWithGoogle()
    .then(result => {
      console.log(`User created with Google : ${result.user.displayName}`);
      setLoading(false)
      Swal.fire({
        title: 'Logged in!',
        text: `${result.user?.displayName ? result.user.displayName : 'User'} logged in successfully!`,
        imageUrl: result.user?.photoURL ? result.user.photoURL : 'https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: 'exit'
      })
      navigate(location?.state ? location?.state : '/');
    })
    .catch(error=> {
      setLoading(false);
      console.error(error.message);
      Swal.fire({
        title: 'Login Failed!',
        text: `${error.message}`,
        icon: 'error',
        confirmButtonText: 'exit'
      })
    })
  }

    return (
<div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row gap-4 lg:gap-12 md:my-12">
    <div className="text-center lg:text-left w-2/3 lg:w-1/2">
      <img className='md:w-[600px]' src={loginBanner} alt="" />
    </div>
    <div className="card flex-shrink-0 w-full lg:w-1/2 border-2 border-gray-300 lg:p-[10px]">
      <h1 className="text-[40px] font-bold text-center">Login</h1>
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="Your Email" className="input input-bordered text-gray-500" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="Your Password" className="input input-bordered text-gray-500" required />
        </div>
       {
        error &&  <p className="text-red-600 font-semibold">{error}</p>
       }
        <div className="form-control mt-6">
        {
            loading
            ? <button type="submit" className="btn bg-gradient-to-r from-purple-700 to-blue-300 font-bold text-white"><span className="loading loading-dots loading-lg"></span></button>
            : <input type="submit" value= {'Sign In'} className="btn bg-gradient-to-r from-purple-700 to-blue-300 font-bold text-white" />
          }
        </div>
        <div className="form-control mt-6">
            <p className="text-center mb-5 text-gray-500 text-[16px] font-semibold">Or Sign In with</p>
            <div className='flex gap-6 mx-auto'>
                <div className='p-3 text-blue-700 text-xl rounded-full bg-gray-200'><FaFacebookF/></div>
                <div className='p-3 text-blue-600 text-xl rounded-full bg-gray-200'><FaLinkedinIn/></div>
                <div onClick={handleGoogleSignIn} className='p-3 text-xl rounded-full bg-gray-200'><FcGoogle/></div>
            </div>
        </div>
        <div className="form-control mt-6 mx-auto text-md ">
            <p className='text-gray-500 font-semibold mx-auto'>Do not have an account? <Link to="/signup" className='bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text font-bold w-fit'>Sign Up</Link></p>
        </div>
      </form>
    </div>
    
  </div>
</div>
    );
};

Login.propTypes = {
    
};

export default Login;