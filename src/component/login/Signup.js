//import {Card,Form,FormControl,FormGroup, FormLabel,Button} from '@mui/material'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import React, {useState} from 'react'
import {login, register, signInWithGoogle} from '../general/auth';
import { Navigate, useNavigate, Link, useSearchParams } from 'react-router-dom';
//import {auth,googleProvider} from '../../service/firebase/firebase';

export default function Signup() {
    const emailRef=useState('');
    const passwordRef=useState('');
    const passwordConfirmRef=useState('');
    const [error, setError]=useState('');
    const [loading, setLoading]=useState(false);
    //const [isLogin, setIsLogin]=useState(true);
    const navigate=useNavigate()
    const [searchParams]=useSearchParams();
    const isLogin=searchParams.get('mode') === 'login';


    async function handleSubmit(event) {
        const [name, value]=event.target;
        event.preventDefault();

        if(passwordRef.current.value!==passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            setLoading(true);
            const response = name==="register"?
                await register(emailRef.current.value, passwordRef.current.value)
                :name==="login"?
                    await login(emailRef.current.value, passwordRef.current.value)
                    :await signInWithGoogle();
            
            if(response.status===401||response.status===422) {
                console.log("Error while authenticating")
            }

            if(!response.ok) {
                console.log("Couldn't authenticate user");
            }
            
            navigate('/')
            console.log("UUUUUUUUUUUUUUUUUUUUUUSER");

        } catch (e){
            setError('Failed to create an account');
            console.log(e.message);
        }
        setLoading(false);
    }


  return (
      <>
        <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
            <div  className='w-100' style={{maxWidth:"400px"}}>
        <Card>
            <Card.Body>
                            <h2 className='text-center mb-4'>{isLogin? "Sign In":"Sign Up"}</h2>
                            {error&&<Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef}  required/>          
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef}  required/>          
                            </Form.Group>
                            
                              {isLogin&&
                                  <Form.Group className='mb-5' id='password-confirm'>
                                      <Form.Label>Password Confirmation</Form.Label>
                                      <Form.Control type="password" ref={passwordConfirmRef} required />
                                  </Form.Group>
                              }
                              <Button className='w-100' type='submit' onClick={handleSubmit}>{isLogin? "Sign In":"Sign Up"}</Button>
                    <hr />
                    <Button className='w-100' name='signInWithGoogle' type='submit' onClick={handleSubmit}>Sign In With Google</Button>
                </Form>
            </Card.Body>
            </Card> 
            
                  <div className='w-100 text-center mt-2'>
                      <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>{!isLogin? "Already have an accoun? Log In" : "Don't have an accoun? Sign Up"}</Link>
                </div>
            </div>
            </Container>
    </>
  )
}













//import { createContext, useContext, useEffect, useState } from 'react';
//import {
//  createUserWithEmailAndPassword,
//  signInWithEmailAndPassword,
//  signOut,
//  onAuthStateChanged,
//} from 'firebase/auth';
//import { auth } from '../firebase';

//const UserContext = createContext();

//export const AuthContextProvider = ({ children }) => {
//  const [user, setUser] = useState({});

//  const createUser = (email, password) => {
//    return createUserWithEmailAndPassword(auth, email, password);
//  };

//   const signIn = (email, password) =>  {
//    return signInWithEmailAndPassword(auth, email, password)
//   }

//  const logout = () => {
//      return signOut(auth)
//  }

//  useEffect(() => {
//    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//      console.log(currentUser);
//      setUser(currentUser);
//    });
//    return () => {
//      unsubscribe();
//    };
//  }, []);

//  return (
//    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
//      {children}
//    </UserContext.Provider>
//  );
//};

//export const UserAuth = () => {
//  return useContext(UserContext);
//};