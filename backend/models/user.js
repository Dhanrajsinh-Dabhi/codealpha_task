const mongoose=require('mongoose');



mongoose.connect('mongodb://127.0.0.1:27017/practise').then(() => {
    console.log("connected");
}).catch((err) => {
    console.error("not connected");
});

const userSchema = mongoose.Schema({
  
   
   
    user_name:{
        type:String,

    },
    userId:{
        type:String,
        
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    m_number: {
        type: String,
        required: true,
        trim: true,
        uniqe: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        uniqe: true,
        min: 8,
        max: 20
    },
    user_question:{
        type:String,
        // required:true,
     enum: ['What is your Favorite Color?', 'What is you best Friend Name?', 'Which City in you born?']
    },
    
    user_question_answer_secret:{
        type:String,
        // required:true
    },
    gender:{
            type: String,
            // enum: ['male', 'female', 'other']
    },
    about: {
        //add bio
    },
    photo: String,
    following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
    },{timestamp:true});

module.exports=(mongoose.model('User',userSchema));
    



