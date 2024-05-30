import React, { useState, useRef, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { HeartOutlined,HeartFilled,CommentOutlined  } from '@ant-design/icons';



function Home() {


  const [Profile_Inputs, setProfile_Inputs] = useState({
    caption: '',
    image: null
  });



  const userId = fetch('http://localhost:3000/api/user-id');

  const quillRef = useRef(null);

  const handleCaption = async (value) => {
    setProfile_Inputs((prev) => ({ ...prev, caption: value }))
  };


  const [imagePreview, setImagePreview] = useState(null);

  const handleImage = async (e) => {
    setProfile_Inputs((prev) => ({ ...prev, image: e.target.files[0] }))
    const file = e.target.files[0];

    // const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);






    let formData = new FormData();

    formData.append('image', file);
    formData.append('userId', userId); // Replace 'userId' with your user ID variable

    console.log([...formData]);

    try {
      const response = await axios.post('http://localhost:3000/api/user-profile/upload-image', formData, userId);
      console.log(response);
      console.log('Response from server:', response.data);
      toast.success("Post upload successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    catch (err) {

      toast.error(err.response?.data?.message || 'Post upload failed.');
      console.log('error in post submit=> ', err);
    }

  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:3000/api/user-profile/create-post', Profile_Inputs);
      console.log(Profile_Inputs);
      console.log('Response from server:', response.data);

      toast.success("Post upload successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Post upload failed.');
      console.log('error in post submit=> ', err);
    }
  };



  const viewImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };




  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {

        const response = await axios.get('http://localhost:3000/api/users-posts');
        setPosts(response.data);
      } catch (err) {
        console.log('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);


  return (

    <><form onSubmit={handlePostSubmit}>
      <ToastContainer position="top-center" />
      <ReactQuill
        ref={quillRef}
        value={Profile_Inputs.caption}
        onChange={handleCaption} />
      <label> Camera Icon
        <input type='file' name='image' accept='images/*' hidden onChange={handleImage} />

      </label><br></br>
      <input type='submit' value='Post' />

    </form>

      
      <div> 
        {posts.map((post) => (
          <div key={post._id}>
             <p>----------------------------</p>
             
            <p>{post.caption}</p>
            <p><HeartOutlined />{post.like}likes
              <br></br>
             <CommentOutlined /> {post.comment}comments</p>
            <p>{moment(post.createdAt).fromNow()}</p>
          </div>
        ))}
      </div>
       
    </>


  );
}



export default Home;