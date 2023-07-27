import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { useLocation, useNavigate } from "react-router-dom";
import './UpdatePost.css';

function UpdatePost({ isAuth }) {

    const [post, setPost] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getPost = async () => {
            const docRef = doc(db, "user-posts", location.state.id);
            const docSnap = await getDoc(docRef);
            setPost(docSnap.data());
        }

        getPost();
    }, [location.state.id])

    const updatePost = async () => {
        const docRef = doc(db, "user-posts", location.state.id);
        await updateDoc(docRef, {
            title: post?.title,
            message: post?.message,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
        })
        navigate("/");
    }


    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [])

    if (!post) {
        return <div><h2>Loading...</h2></div>;
    }

    return (
        <div className='update-post-page'>
            <div className='post-container'>
                <div className='post-inputs'>
                    <h1>Create a Post</h1>
                    <div>
                        <label>Title: </label>
                        <input type="text" placeholder='Enter Title' onChange={(e) => { setPost({ ...post, title: e.target.value }) }} value={post?.title} />
                    </div>
                    <div>
                        <label>Message: </label>
                        <textarea placeholder='Enter Message' onChange={(e) => { setPost({ ...post, message: e.target.value }) }} value={post?.message}></textarea>
                    </div>
                </div>
                <div>
                    <button onClick={updatePost}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default UpdatePost