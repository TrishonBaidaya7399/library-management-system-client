// import PropTypes from 'prop-types';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import loginBanner from "../../images/images/register.png"
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../Provider/AuthProvider';

const SignUp = () => {  
  const {createUser, updateUserProfile, googleSignUp, user} = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(""); 
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSignUp = e =>{
    e.preventDefault();
    setLoading(true)
    setError(null)
    setPasswordError("")
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const role = "user";
    const password = form.password.value;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{6,})$/;

         if (!password.match(passwordPattern)) {
          setPasswordError("Password must include at least 6 characters, a capital letter, and a special symbol");
          setLoading(false)
           return; // Stop sign-up process if password is invalid
          } else {
            setPasswordError(""); 
          }

    const newUser = {name, email, password, role, photo};
    console.log(newUser);
    createUser(email, password)
    .then(result => {
      console.log(result.user);
       //set user to mongodb server
    const createdAt = result.user?.metadata?.creationTime;
    const user ={name, email, photo, createdAt }
    //https://coffee-shop-server-nine.vercel.app
    fetch('https://library-management-system-server-phi.vercel.app/user', {
        method: "POST",
        headers: {
            'content-type': "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data=>{
                         
        if(data.insertedId){
            Swal.fire({
                title: 'Success!',
                text: 'New '+ role +' account created successfully!',
                imageUrl: user?.photoURL, 
                imageAlt: user?.name,
                confirmButtonText: 'Close'
              })
              form.reset();
        }
    })
    .catch(error=> {
      console.error(error.message);
      setError(error.message)
        Swal.fire({
        title: 'Failed!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
})
      // update user profile on firebase
      updateUserProfile(name, photo)
      .then(()=> {
        console.log('Profile Updated!');
        setLoading(false);
        form.reset();
        Swal.fire({
          title: 'Profile Created!',
          text: `${result.user?.displayName ? result.user.displayName : 'User'} Profile created successfully!`,
          imageUrl: result.user?.photoURL ? result.user.photoURL || result.user.photoURL : 'https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          showConfirmButton: false,
          timer: 1500,
        })
        navigate('/');
      })
      .catch(error=> {console.error(error.message); setLoading(false);})
    })
    .catch(error=> {setError(error.message); setLoading(false)})
  }

  const handleGoogleSignUp = e =>{
    e.preventDefault();
    setLoading(true);
    setError(null);
    googleSignUp()
    .then(result => {
      console.log(`User created with Google : ${result.user.displayName}`);
      setLoading(false);
      Swal.fire({
        title: 'Logged in!',
        text: `${result.user?.displayName ? result.user.displayName : 'User'} logged in successfully!`,
        imageUrl: user?.photoURL ? user.photoURL : 'https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: 'exit'
      })
      navigate('/');
    })
    .catch(error=> {
      console.error(error.message);
      setLoading(false);
      alert(error.message)
    })
  }


    return (
<div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row gap-4 lg:gap-12 md:my-12">
    <div className="text-center lg:text-left w-2/3 lg:w-1/2">
      <img className='md:w-[800px]' src={loginBanner} alt="" />
    </div>
    <div className="card flex-shrink-0 w-full lg:w-1/2 border-2 border-gray-300 lg:p-[10px]">
      <h1 className="text-[40px] font-bold text-center">Sign Up</h1>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="Your Name" className="input input-bordered text-gray-600" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile Image URL</span>
          </label>
          <input type="text" name='photo' placeholder="Your Profile Image URL" className="input input-bordered text-gray-600" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="Your Email" className="input input-bordered text-gray-600" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input type="password" name='password' placeholder="Your Password" className="input input-bordered text-gray-600" required />
        </div>
        {
        passwordError && (
              <p className="text-red-600">{passwordError}</p>
            )}
        {
        error &&  <p className="text-red-600 font-semibold">{error}</p>
       }
        <div className="form-control mt-6">
          {
            loading
            ? <button type="submit" className="btn bg-gradient-to-r from-purple-700 to-blue-300 font-bold text-white"><span className="loading loading-dots loading-lg"></span></button>
            : <input type="submit" value= {'Sign Up'} className="btn bg-gradient-to-r from-purple-700 to-blue-300 font-bold text-white" />
          }
        </div>
        <div className="form-control mt-6">
            <p className="text-center mb-5 text-gray-500 text-[16px] font-semibold">Or Sign Up with</p>
            <div className='flex gap-6 mx-auto'>
                <div className='p-3 text-blue-700 text-xl rounded-full bg-gray-200'><FaFacebookF/></div>
                <div className='p-3 text-blue-600 text-xl rounded-full bg-gray-200'><FaLinkedinIn/></div>
                <div onClick={handleGoogleSignUp} className='p-3 text-xl rounded-full bg-gray-200'><FcGoogle/></div>
            </div>
        </div>
        <div className="form-control mt-6 mx-auto ">
            <p className='text-gray-500 font-semibold'>Have an account? <Link to="/signin" className='bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text text-lg font-bold w-fit'>Log In</Link></p>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

SignUp.propTypes = {
    
};

export default SignUp;