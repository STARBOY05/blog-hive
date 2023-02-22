import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firebase-config';

function Login() {

    const [loginUser, setLoginUser] = useState({});

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginUser.email, loginUser.password);
            console.log(user);
        }
        catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div>
            <h3>Login User</h3>
            <input type="text" placeholder="Enter email" onChange={(e) => { setLoginUser({ ...loginUser, email: e.target.value }) }} />
            <input type="password" placeholder="Enter password" onChange={(e) => { setLoginUser({ ...loginUser, password: e.target.value }) }} />
            <button onClick={login}>Log-In User</button>
            <p>OR</p>
            <button>Not a user? Register Here!</button>
        </div>
    )
}

export default Login