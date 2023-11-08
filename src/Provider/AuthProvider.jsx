import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config"
import { useEffect } from "react";

const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading]= useState(true)
    const [isAdmin, setIsAdmin] = useState(false);
    console.log(user);
    

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }
    
    const signInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log("User in the auth state change", currentUser);
            setUser(currentUser);
            setLoading(false);
                fetch(`https://library-management-system-server-phi.vercel.app/user?email=${currentUser?.email}`)
                .then(res=> res.json())
                .then(data => {
                    console.log(data);
                  if(data[0].role === "admin"){
                    setIsAdmin(true)
                    console.log('ADMIN ID Logged In');
                  }else{
                    setIsAdmin(false)
                  }
                })
                .catch(error => {
                  console.log(error.message);
                })
        });
        return ()=>{
            unSubscribe();
        }
    },[])

    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
      };

    const userInfo ={
        user,
        loading,
        createUser,
        signInUser,
        logOut,
        updateUserProfile,
        signInWithGoogle,
        setIsAdmin,
        isAdmin,
        // removeUser,
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;