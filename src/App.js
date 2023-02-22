import './App.css';
import { useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Register from './components/Register/Register';
import Login from './components/Login/Login';


function App() {


  const [currUser, setCurrUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setCurrUser(currentUser);
  })

  const logout = async () => {
    await signOut(auth);
  }

  return (
    <div className="App">
      {/* <div>
        <h3>Register User</h3>
        <input type="text" placeholder="Enter email" onChange={(e) => { setRegisterUser({ ...registerUser, email: e.target.value }) }} />
        <input type="password" placeholder="Enter password" onChange={(e) => { setRegisterUser({ ...registerUser, password: e.target.value }) }} />
        <button onClick={register}>Create User</button>
      </div>
      <div>
        <h3>Login User</h3>
        <input type="text" placeholder="Enter email" onChange={(e) => { setLoginUser({ ...registerUser, email: e.target.value }) }} />
        <input type="password" placeholder="Enter password" onChange={(e) => { setLoginUser({ ...registerUser, password: e.target.value }) }} />
        <button onClick={login}>Log-In User</button>
      </div>
      <div>
        <h2>User Logged In: {currUser?.email}</h2>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div> */}
    {currUser?.email ? <Register /> : <Login />}
    </div>
  );
}

export default App;
