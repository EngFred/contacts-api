import express from 'express';
import { getAllContacts, getContactById, deleteContact, updateContact, createContact, searchContact } from '../controllers/contactsController.js';
import { validateContact } from '../middleware/validateContact.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

router.route('/')
    .get(authenticateJWT, getAllContacts)     
    .post( authenticateJWT, validateContact, createContact); 

router.route('/search')
    .get(authenticateJWT, searchContact);

router.route('/:id')
    .get(authenticateJWT, getContactById)  
    .put( authenticateJWT, validateContact, updateContact)     
    .delete(authenticateJWT, deleteContact);   

export default router;