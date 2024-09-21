import { body, validationResult } from 'express-validator';

export const validateUserLogin = [
    body('email')
        .notEmpty().withMessage('Email address is missing!')
        .isEmail().withMessage('Invalid email address!'),
    body('password')
        .notEmpty().withMessage('Password is missing!'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: messages });
        }
        next(); // Proceed if there are no validation errors
    }

];
