const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { User } = require('../../db/models');
const { authenticated, generateToken, loginUser } = require('./auth.js');

const router = express.Router();

const signinValidators = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    check('password')
        .not().isEmpty()
        .withMessage('Please provide a password')
]

const signupValidators = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Username')
        .isLength({ max: 255 })
        .withMessage('Username must not be more than 255 characters long'),
        // .custom((value) => {
        // return db.User.findOne({ where: { userName: value } })
        //     .then((user) => {
        //     if (user) {
        //         return Promise.reject('The provided Username is already in use by another account');
        //     }
        //     });
        // }),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email Address')
        .isLength({ max: 255 })
        .withMessage('Email Address must not be more than 255 characters long')
        .isEmail()
        .withMessage('Email Address is not a valid email')
        .custom((value) => {
            return User.findOne({ where: { email: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('The provided Email Address is already in use by another account');
                    }
                });
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ max: 50 })
        .withMessage('Password must not be more than 50 characters long'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .isLength({ max: 50 })
        .withMessage('Confirm Password must not be more than 50 characters long')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm Password does not match Password');
            }
            return true;
        })
];

router.get('/', asyncHandler(async function (req, res, next) {
    const users = await User.findAll();
    res.json({ users });
}));

router.put('/', [signinValidators], asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return next({ status: 422, errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    // if(user !== null) {
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
        if(passwordMatch) {
            const{ jti, token } = generateToken(user);
            user.tokenId = jti;
            await user.save();
            res.cookie('token', token, secure=true);
            res.json({ token, user: user.toSafeObject() });
        } else {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['Invalid credentials'];
            return next(err);
        }
    // }
}));

router.delete('/', [authenticated], asyncHandler(async(req, res) => {
    req.user.tokenId = null;
    await req.user.save();
    res.clearCookie('token');
    res.json({ message: 'success' });
}));

router.post('/', [signupValidators], asyncHandler(async(req, res, next) => {
    const validatorErrors = validationResult(req)
    if(!validatorErrors.isEmpty()) {
        console.log(validatorErrors.array());
        return next({ status: 422, errors: validatorErrors.array() });
    }

    const {
        username,
        email,
        password
    } = req.body;

    // if(validatorErrors.isEmpty()) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            hashedPassword
        });
        const{ jti, token } = generateToken(user);
        user.tokenId = jti;
        await user.save();
        res.cookie('token', token);
        res.json({ token, user: user.toSafeObject() });
    // }
}));

module.exports = router;
