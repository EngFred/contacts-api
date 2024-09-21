import { body, validationResult } from 'express-validator';

export const validateUserReg = [
    body('firstname')
        .notEmpty().withMessage('First name is missing!')
        .isLength({ min: 2 }).withMessage('The first name must be at least two characters long!'),
    body('lastname')
        .notEmpty().withMessage('Last name is missing!')
        .isLength({ min: 2 }).withMessage('The last name must be at least two characters long!'),
    body('email')
        .notEmpty().withMessage('Email address is missing!')
        .isEmail().withMessage('Invalid email address!'),
    body('password')
        .notEmpty().withMessage('Password is missing!')
        .isLength({ min: 6 }).withMessage('The password is too short!'),
    body('telno')
        .notEmpty().withMessage('Telephone number is missing!')
        .isMobilePhone().withMessage('Invalid telephone number'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: messages });
        }
        next(); // Proceed if there are no validation errors
    }

];
