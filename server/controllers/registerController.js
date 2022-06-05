const { User, validate } = require('../models/User');
const UserOTPVerification = require('../models/UserOTPVerification');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const sendSMS = require('../helpers/sendSMS');

// class registerController{
//     async handleRegister(req, res){
//         req.check('email', 'Invalid email address').isEmail();
//         req.check('password', 'Password is invalid').isLength({min: 8})

//         const err = req.validationErrors();
//         if(err) res.status(400).json(err.details[0].message)

//         const { error } = validate(req.body);
//         // if (error) return res.status(400).json(error.details[0].message);
//         console.log('1', 1)
//         let { name, familyName, email, password } = req.body;
//         console.log('name', name)
//         if ( !name || !familyName || !email || !password) return res.status(400).json({
//             'message': 'All fields are required.'
//         });

//         name = name.trim();
//         familyName = familyName.trim();
//         email = email.trim();
//         password = password.trim();

//         console.log('name', name);

//         // Check email
//         if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//             return res.status(401).json({ message: "Invalid Email or Password" });
//         }

//         // check for duplicate usernames in the db
//         const duplicateUser = await User.findOne({ email }).exec();
//         if (duplicateUser) return res.status(409).json({ 
//             message: "User already exists! Login Instead" 
//         }); //Conflict 

//         // If everything was okay and email wasnt already in the db
//         try {

//             // First hash the password
//             const hashedPassword = await bcrypt.hash(password, 10);

//             // Now create and store the user in the db
//             const user = await User.create({
//                 name,
//                 familyName,
//                 email,
//                 "password": hashedPassword,
//                 "id": uuid.v4()
//             });

//             // Crete OTP
//             const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

//             // Store OTP in OTP db
//             const userOTPRecord = await UserOTPVerification.create({ 
//                 "id": user.id,
//                 otp,
//                 "createdAt": Date.now(),
//                 "expiredAt": Date.now() + 60 * 1000
//             })

//             // Now send verification SMS
//             const isOTPSent = await sendSMS(`
//                 This is your verification code: ${otp}, Remember it expires in 1 minute!
//             `);

//             const userId = user.id;
//             if (isOTPSent) {
//                 console.log('otp', otp);
//                 console.log('userId', userId);
//                 return res
//                     .status(400)
//                     .send({ message: "کد احراز هویت برای شما پیامک شد.", data: { userId } });
//             } else {
//                 return res.status(500).send({ message: "خطای سرور" });
//             }
//         } catch (error) {
//             return res.status(500).json({
//                 'message': error.message
//             });
//         }
//     }

//     getRegister = (req, res) => {
//         res.render('register')
//     }
// } 

const handleRegister = async (req, res) => {
    console.log("1")
    // req.check('email', 'Invalid email address').isEmail();
    // req.check('password', 'Password is invalid').isLength({min: 8})

    // const err = req.validationErrors();
    // if(err) res.status(400).json(err.details[0].message)

    const { error } = validate(req.body);
    // if (error) return res.status(400).json(error.details[0].message);
    console.log('1', 1)
    let { name, familyName, email, password } = req.body;
    console.log('name', name)
    if ( !name || !familyName || !email || !password) return res.status(400).json({
        'message': 'All fields are required.'
    });

    name = name.trim();
    familyName = familyName.trim();
    email = email.trim();
    password = password.trim();

    console.log('name', name);

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

        // Now create and store the user in the db
        const user = await User.create({
            name,
            familyName,
            email,
            "password": hashedPassword,
            "id": uuid.v4()
        });

        // Crete OTP
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        // Store OTP in OTP db
        const userOTPRecord = await UserOTPVerification.create({ 
            "id": user.id,
            otp,
            "createdAt": Date.now(),
            "expiredAt": Date.now() + 60 * 1000
        })

        // Now send verification SMS
        const isOTPSent = await sendSMS(`
            This is your verification code: ${otp}, Remember it expires in 1 minute!
        `);

        const userId = user.id;
        if (isOTPSent) {
            console.log('otp', otp);
            console.log('userId', userId);
            return res
                .status(400)
                .send({ message: "کد احراز هویت برای شما پیامک شد.", data: { userId } });
        } else {
            return res.status(500).send({ message: "خطای سرور" });
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

// module.exports = new registerController();
module.exports = handleRegister