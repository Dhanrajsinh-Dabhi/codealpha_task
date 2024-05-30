// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const postSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'User' },
     caption: {
        // I use type because rich text editor can sent any type of data
        type:String,
        required: true
    },
    filename: {
        type: String,
        // required: true  // Add required field for better data integrity
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    image: {
        url: String,
        public_id: String
    },
    like: [{type: ObjectId, ref: "User"}],
    comment: [
        {
            text: String,
            created: {type: Date, default: Date.now},
            postedBy:{
                type: ObjectId,
                ref: "User"
            }
        }
    ]

}, {timestamps: true});

module.exports= mongoose.model("Post", postSchema);


