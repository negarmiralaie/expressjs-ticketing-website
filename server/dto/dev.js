const yup = require('yup');

module.exports = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().trim().required().max(32),
    familyName: yup.string().trim().required().max(32),
    password: yup.string().trim().required().min(8),
    isVerified: yup.boolean().default(false),
})