import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase-config';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home({ isAuth }) {

  // states for posts
  const [posts, setPosts] = useState([]);
  // firebase collections reference
  const postsCollectionsRef = collection(db, "user-posts");

  const navigate = useNavigate();

  // handles firestore delete
  const deletePost = async (id) => {
    const postDoc = doc(db, "user-posts", id);
    await deleteDoc(postDoc);
  };

  // handles firestore update
  const handleUpdatePost = (id) => {
    navigate("/updatePost", { state: { id: id } })
  }

  // render all posts present in firestore
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionsRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getPosts();
  }, [])

  return (
    <div className="home-page">
      {posts.map((post, idx) => {
        return (
          <div className="posts" key={idx}>
            <div className="post-header">
              <div className="post-title">
                <h1> {post.title}</h1>
              </div>
              <div className="delete-post">
                {
                  isAuth && post.author.id === auth.currentUser.uid && (
                    <>
                      <button onClick={() => { handleUpdatePost(post.id) }}>✏️</button>
                      <button onClick={() => { deletePost(post.id); }}>🗑️</button>
                    </>
                  )}
              </div>
            </div>
            <div className="post-message"> {post.message} </div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  )
}

export default Home