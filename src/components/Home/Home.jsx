import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase-config';
import './Home.css';

function Home({ isAuth }) {

  const [posts, setPosts] = useState([]);

  const postsCollectionsRef = collection(db, "user-posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "user-posts", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionsRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getPosts();
  }, [])

  return (
    <div className="home-page">
      {posts.map((post) => {
        return (
          <div className="posts">
            <div className="post-header">
              <div className="post-title">
                <h1> {post.title}</h1>
              </div>
              <div className="delete-post">
                {
                  isAuth && post.author.id === auth.currentUser.uid && (
                    <button onClick={() => { deletePost(post.id); }}>🗑️</button>
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