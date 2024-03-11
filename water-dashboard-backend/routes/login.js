const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Register = require('../Schema/Register');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

router.post('/', async (req, res, next) => {
    try {
        const { password, username } = req.body;
        const user = await Register.findOne({ username });

        console.log("user :- ", user);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const token = jwt.sign({ _id: user?._id }, process.env.JwtSecretKey, {
                    expiresIn: 36000,
                })

                console.log("token :- ", token);

                res.json({
                    status: 'success',
                    message: 'Login successful',
                    data: {
                        token: token,
                        status: true,
                        username: user.username,
                    },
                });
            } else {
                res.json({
                    status: 'error',
                    message: 'Invalid Email or Password',
                });
            }
        } else {
            res.json({
                status: 'error',
                message: 'Invalid Email or Password',
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});

// router.get('/', async (req, res, next) => {
//     try {

//         const registerData = {
//             first_name: 'Piyushbhai',
//             last_name: "Patel",
//             mobile_no: "9574724341",
//             username: "9574724341",
//             password: await hashPassword("9574724341")
//         }

//         console.log("registerData: - ", registerData);

//         const recordRequest = new Register(registerData);
//         const saveRequest = await recordRequest.save();

//         const responseMessage = saveRequest
//             ? { status: 'success', message: 'Register successfully' }
//             : { status: 'failure', message: 'Something went wrong. Please try again.', error: 'add failed' };

//         res.json(responseMessage);
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;
