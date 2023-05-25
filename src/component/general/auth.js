import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import {auth, googleProvider} from '../../service/firebase/firebase';

console.log(auth?.currentUser?.photoURL);

export const register=async (email, password) => {
        try {
            const response=await createUserWithEmailAndPassword(auth, email, password.current.value);
            console.log("UUUUUUUUUUUUUUUUUUUUUUSER");
            console.log(response);
            return response;
        } catch(e) {
            console.log(e.message);
        }
    }


export const login=(email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const response=userCredential.user;
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error.codePointAt);
                console.log(error.message);
                //console.log(err);
            })
    }


export const signInWithGoogle=async ()=>{
        try {
            const response=await signInWithPopup(auth, googleProvider);
            return response;
        } catch(err) {
            console.log(err);
        }
    }


export const logout=async () => {
        try {
            await signOut(auth)
            console.log("SIGNED OUT SUCCESSFULLY");
        }
            catch(error) {
                console.log("ERROR OCCURED IN LOGOUT");
                console.log(error);
        }
}
    









//import React, { useState } from 'react';
//import { Link, useNavigate } from 'react-router-dom';
//import { UserAuth } from '../context/AuthContext';

//const Signin = () => {
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');
//  const [error, setError] = useState('');
//  const navigate = useNavigate();
//  const { signIn } = UserAuth();

//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    setError('')
//    try {
//      await signIn(email, password)
//      navigate('/account')
//    } catch (e) {
//      setError(e.message)
//      console.log(e.message)
//    }
//  };

//  return (
//    <div className='max-w-[700px] mx-auto my-16 p-4'>
//      <div>
//        <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
//        <p className='py-2'>
//          Don't have an account yet?{' '}
//          <Link to='/signup' className='underline'>
//            Sign up.
//          </Link>
//        </p>
//      </div>
//      <form onSubmit={handleSubmit}>
//        <div className='flex flex-col py-2'>
//          <label className='py-2 font-medium'>Email Address</label>
//          <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' />
//        </div>
//        <div className='flex flex-col py-2'>
//          <label className='py-2 font-medium'>Password</label>
//          <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' />
//        </div>
//        <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
//          Sign In
//        </button>
//      </form>
//    </div>
//  );
//};

//export default Signin;