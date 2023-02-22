import React, { useState } from 'react'
import './Register.css';
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {

    const [registerUser, setRegisterUser] = useState({});
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerUser.email, registerUser.password);
            setRegisterUser({ email: "", password: "" });
            console.log(user);
        }
        catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div className='register-form'>
            <div className='register-title'>
                <h3>Register User</h3>
            </div>
            <div>
                <label>Email: </label>
                <input type="text" placeholder="Enter email" value={registerUser.email} onChange={(e) => { setRegisterUser({ ...registerUser, email: e.target.value }) }} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" placeholder="Enter password" value={registerUser.password} onChange={(e) => { setRegisterUser({ ...registerUser, password: e.target.value }) }} />
            </div>
            <button onClick={register}>Register</button>
            <p>OR</p>
            <p>Already a user? <a href=''>Login Here</a></p>
        </div>
    )
}

export default Register