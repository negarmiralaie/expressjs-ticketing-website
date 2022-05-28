const mongoose = require('mongoose');
const Joi = require("joi");

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
    console.log('4', 4)
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(7).required().strict(),
    });

    console.log('5', 5)
    return schema.validate(user);
}

module.exports = {
    User,
    validate,
};