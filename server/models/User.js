import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    seenNotifications: {
        type: Array,
        default: []
    },
    unseenNotifications: {
        type: Array,
        default: []
    },
    Active: {
        type: Boolean,
        default: true
    },
    location: String,
    occupation: String,
    viewProfile: Number,
    impressions: Number,
}, { timestamps: true }
)

const User = mongoose.model('users', UserSchema)


export default User