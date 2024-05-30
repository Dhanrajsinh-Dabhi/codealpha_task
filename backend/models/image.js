const mongoose=require('mongoose');

const {ObjectId} = mongoose.Schema;



mongoose.connect('mongodb://127.0.0.1:27017/practise').then(() => {
    console.log("connected");
}).catch((err) => {
    console.error("not connected");
});

const imgSchema = mongoose.Schema({

    filename: {
        type: String,
        required: true  // Add required field for better data integrity
    },
    timestamp: {
        type: Date,
        default: Date.now // Set default timestamp for convenience
    }
});

module.exports = mongoose.model('image',imgSchema);

    



