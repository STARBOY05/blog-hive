import { getAuth, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, googleProvider } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login({ setIsAuth }) {

    const navigate = useNavigate()
    const auth = getAuth();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSignInWithEmailPassWord = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then(() => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        })
    }


    return (
        <div className='login-page'>
            {/* <form action="" className='email-password-box'>
                <div className='fields'>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='fields'>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' style={{ marginTop: "10px" }} onClick={(e) => handleSignInWithEmailPassWord(e)}>Submit</button>
            </form> */}
            <button className='login-with-google-btn' onClick={handleSignInWithGoogle}>
                Sign-in with Google
            </button>
        </div>
    )
}

export default Login