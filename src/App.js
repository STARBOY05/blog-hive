import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import MakePost from './components/MakePost/MakePost';
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import UpdatePost from './components/UpdatePost/UpdatePost';

function App() {

  // usestate for auth
  const [isAuth, setIsAuth] = useState(false);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // clear the auth
      localStorage.clear();
      setIsAuth(false);
      // navigate to home
      window.location.href = "/";
    })
  }

  useEffect(() => {
    setIsAuth(localStorage?.getItem("isAuth"));
  })

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/"><h3>Blog Hive</h3></Link>
          {!isAuth ? <Link to="/login">Login</Link> : (
            <>
              <Link to="/makePost">Create Post</Link>
              <button onClick={handleSignOut}>Log Out</button>
            </>
          )}
        </nav>
        <Routes>
          <Route path='/' element={<Home isAuth={isAuth} />} />
          <Route path='/makePost' element={<MakePost isAuth={isAuth} />} />
          <Route path='/updatePost' element={<UpdatePost isAuth={isAuth} />} />
          <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
