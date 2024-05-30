const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const User = require('./models/user');

const e = require('cors');
const jwt = require('jsonwebtoken');
const GenerateAccessToken = require('./jwt/GenerateAccessToken');
const AuthenticateToken = require('./jwt/AuthenticateToken');
const user = require('./models/user');
const post = require('./models/post');
const image=require('./models/image');
const fs = require('fs');

//recive file from the frontend side
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary')
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json()   )





app.get('', (req, resp) => {
    resp.send("back end  home page");
});

app.post('/api/register', async (req, resp) => {
  

    const { user_name, name, m_number, email, password, user_question, user_question_answer_secret } = req.body;
    console.log(user_name, name, m_number, email, password, user_question, user_question_answer_secret);
    // validation
    if (!user_name) return resp.send("user_name is Required");
    const user_name_exist = await User.findOne({ 'email': user_name });
    if (user_name_exist) return resp.send("user_name  already exist"); // send msg if email already exist


    if (!name) return resp.stps.send("Name is Required");
    if (!password)
        return resp.send("Password should be 8 charectors long");
    if (!user_question_answer_secret) return resp.send("Answer is Required");
    // check if user already exist
    const exist = await User.findOne({ email });
    if (exist) return resp.send("Email already exist"); // send msg if email already exist


   
});




app.post('/api/login', async (req, resp) => {

    const { email, password } = req.body;
    try {


        const user = await User.findOne({ 'email': email });
        if (!user) {
            console.log('use not founded');
            return resp.status(404).json({ ok: false, message: 'User not found' })

        }
        //check password
        if (user.password !== password) {
            console.log('use not founded');
            return resp.status(401).json({ ok: false, message: 'Incorrect password' })

        }
        //create jwt token
        const token = await GenerateAccessToken(user);
        console.log(token, " this token sending to frontend from server");

        resp.json({ ok: true, token, message: 'Login successful' });
    }
    catch (error) {
        resp.status(500).json({ ok: false, message: 'An error occurred during login' });
        console.error(error);
    }
});


app.post('api/verifyToken', async (req, resp) => {

    const { token } = req.body;

    if (!token) {
        return resp.status(400).json({ ok: false, message: 'No token provided' });
    }

    const result = await AuthenticateToken(token);

    if (result.success) {
        return resp.json({ ok: true, data: result.data });
    } else {
        return resp.status(401).json({ ok: false, message: result.error });
    }



});
app.post('/api/forgot-password', async (req, resp) => {

    const { email, user_question, user_question_answer_secret, new_password } = req.body;

    // Validation    
    if (!email) {
        return resp.json({
            error: "Email is required"
        })
    }

    if (!new_password || new_password.length < 8) {
        return resp.json({
            error: "New password is required and it should be at least 8 characters long"
        })
    }
    if (!user_question || !user_question_answer_secret) {
        return resp.json({
            error: "User question and secret are required"
        })
    }

    try {
        // Check if user with email and correct secret exists
        const user = await User.find({ 'email': email }, { 'user_question_answer_secret': user_question_answer_secret });
        if (!user) {
            return resp.json({
                error: "We are unable to verify you, please enter valid data"
            });
        }

        // Update user's password
        const updatedUser = await User.updateOne(
            { 'email': email },
            { $set: { password: new_password } }
        );

        if (updatedUser) {
            console.log('Successfully updated password.');
            return resp.json({
                success: "Password updated successfully"
            });
        } else {
            console.log('Failed to update password.');
            return resp.json({
                error: "Something went wrong, try again"
            });
        }
    }
    catch (error) {
        console.log("Error while forgetting password:", error);
        return resp.json({
            error: "Something went wrong, try again"
        });
    }
});


// -----------------------------------//

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploaded_images/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {  
        // const userId = req.userId; // Retrieve the userId from the middleware
        const fileID = uuidv4(); // Use original extension
        const filename = `${fileID}-${file.originalname}`;
     
        const f_name= new image({filename});
        f_name.save();
        
        cb(null, filename);
    },
});
const f_name=storage.filename;
console.log(f_name);    
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10// 10 MB limit
    }
});


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

app.post('/api/user-profile/upload-image', upload.single('image'), async (req, resp,err) => {
    try{
        if(!err)
            {
                resp.status(200).json({ message: 'Image uploaded successfully' });

            }
    }
    catch{
        console.log("error to uplaode image:=>",err);
    }
   
});


app.post('/api/user-profile/create-post', (req, res) => {
    const { caption, userId } = req.body;

    console.log(caption)


    if (!caption) {
        return res.status(400).json({ message: 'content required' });
    }


    console.log('Received captions', { caption });
    res.status(200).json({ message: 'Post uploaded successfully' });

    try {
        const post_data = new post({ caption, userId });
        post_data.save();
        res.json(post);
    } catch (error) {
        console.log("Error while creating post server => ", error);
        res.status(500).json({ message: 'Internal server error' });
    }


});




app.use('/images', express.static(path.join(__dirname, 'uploaded_images')));


//retrive image and post 
app.get('/api/users-posts/images', async (req, resp) => {
    const directoryPath = path.join(__dirname, 'uploaded_images');
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        resp.status(500).json({ error: 'Error fetching images' });
      } else {
     
   
        // Send relative URLs for the images
        const fileUrls = files.map((file) => `/images/${file}`);
        resp.send(directoryPath);

      }
    });
  });
  
app.get('/api/users-posts', async (req, resp) => {
    try {
        const posts = await post.find({}); // Assuming Post is your model
        resp.json(posts);
      } catch (err) {
        resp.status(500).json({ error: 'Error fetching posts' });
      }
    }
);



app.get('/getall', async (req, resp) => {

    const users = await User.find();
    resp.status(200).send(users);
});

app.get('/api/user-id', async (req, resp) => {
    const id = req.query.id;
    // const user = await User.findById(id);
    resp.send(id);
    console.log(id);
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server runnig at $http://localhost:3000 || ${PORT}`);

});