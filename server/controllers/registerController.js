const { User, validate } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendOTPVerificationEmail = require('../helpers/sendOTPVerificationMail');

const handleRegister = async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    let { name, familyName, email, password } = req.body;
    if ( !name || !familyName || !email || !password) return res.status(400).json({
        'message': 'All fields are required.'
    });

    name = name.trim();
    familyName = familyName.trim();
    email = email.trim();
    password = password.trim();

    // Check email
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // check for duplicate usernames in the db
    const duplicateUser = await User.findOne({ email }).exec();
    if (duplicateUser) return res.status(409).json({ 
        message: "User already exists! Login Instead" 
    }); //Conflict 

    // If everything was okay and email wasnt already in the db
    try {

        // First hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const emailToken = jwt.sign({ email }, process.env.EMAIL_SECRET, {
            expiresIn: '1d'
        });

        // Now create and store the user in the db
        const user = await User.create({
            name,
            familyName,
            email,
            "password": hashedPassword,
            emailToken
        });

        const foundUser = await User.findOne({email});

        // Now send verification email
        const isOTPSent = sendOTPVerificationEmail(foundUser.id, foundUser.email);

        if (isOTPSent) {
            return res
				.status(400)
				.send({ message: "An Email sent to your account please verify" });
        } else {
            return res.status(500).send({ message: "Internal Server Error" });
        }
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        });
    }
}

const getRegister = (req, res) => {
    res.render('register')
}

module.exports = {
    handleRegister,
    getRegister
};