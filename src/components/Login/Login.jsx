import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, googleProvider } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login({ setIsAuth }) {

    const navigate = useNavigate()

    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then((userData) => {
            sessionStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        })
    }


    return (
        <div className='login-page'>
            <button className='login-with-google-btn' onClick={handleSignInWithGoogle}>
                SignIn with Google
            </button>
        </div>
    )
}

export default Login