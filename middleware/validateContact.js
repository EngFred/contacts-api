import { body, validationResult } from 'express-validator';

export const validateContact = [
    body('firstname')
        .notEmpty().withMessage('First name is missing!')
        .isLength({ min: 2 }).withMessage('The first name must be at least two characters long!'),
    body('lastname')
        .notEmpty().withMessage('Last name is missing!')
        .isLength({ min: 2 }).withMessage('The last name must be at least two characters long!'),
    body('telno')
        .notEmpty().withMessage('Telephone number is missing!')
        .isMobilePhone().withMessage('Invalid telephone number'),
    body('email')
        .notEmpty().withMessage('Email address is missing!')
        .isEmail().withMessage('Invalid email address!'),
    body('address').notEmpty().withMessage('Address is missing!'),
    body('relationship')
        .notEmpty().withMessage('Relationship type is missing!')
        .toLowerCase()
        .isIn(['father', 'mother', 'sister', 'brother', 'friend', 'colleague', 'partner', 'other'])
        .withMessage('Invalid relationship type!'),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: messages });
        }
        next(); // Proceed if there are no validation errors
    }

];
