import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import MakePost from './components/MakePost/MakePost';
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      sessionStorage.clear();
      setIsAuth(false);
      window.location.href = "/";
    })
  }


  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>

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
          <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
