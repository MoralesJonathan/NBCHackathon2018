const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    dob: {
        type: Date,
        required: false
    },
    phoneNumber: {
        type: Number,
        required: false,
        maxlength: 10
    },
    address: {
        type: String,
        required: false
    },
    language:{
        type:String, 
        required:false
    },
    interests: [{
        type: String,
    }
    ]
});
module.exports = Profile = mongoose.model('profile', ProfileSchema)