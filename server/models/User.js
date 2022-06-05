const mongoose = require('mongoose');
const Joi = require("joi");
// import { body } from 'express-validator';

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    familyName:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true    
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    emailToken:{
        type: String,
    },
    isVerified:{
        type: String,
        default: false,
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', UserSchema);

const validate = user =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(7).required().strict(),
    });

    return schema.validate(user);
}

module.exports = {
    User,
    validate,
};