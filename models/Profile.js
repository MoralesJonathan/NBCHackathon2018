const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        required: false,
        maxlength : 1
    },
    zipCode: {
        type: Number,
        required: true,
        maxlength: 5
    },
    phoneNumber: {
        type: Number,
        required: false,
        maxlength: 10
    },
    email: {
        type: String,
        required: false
    },
    streetAddress: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false,
        maxlength: 2
    },
    
    interests: [
    ]
});
module.exports = Profile = mongoose.model('profile', ProfileSchema)