import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { useNavigate } from "react-router-dom";
import './MakePost.css';

function MakePost({ isAuth }) {

    const [post, setPost] = useState({});
    // Reference to the collection in the firestore database
    const postCollectionsRef = collection(db, "user-posts");
    const navigate = useNavigate();
    const createPost = async () => {
        await addDoc(postCollectionsRef, {
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


    return (
        <div className='make-post-page'>
            <div className='post-container'>
                <div className='post-inputs'>
                    <h1>Create a Post</h1>
                    <div>
                        <label>Title: </label>
                        <input type="text" placeholder='Enter Title' onChange={(e) => { setPost({ ...post, title: e.target.value }) }} />
                    </div>
                    <div>
                        <label>Message: </label>
                        <textarea placeholder='Enter Message' onChange={(e) => { setPost({ ...post, message: e.target.value }) }}></textarea>
                    </div>
                </div>
                <div>
                    <button onClick={createPost}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default MakePost