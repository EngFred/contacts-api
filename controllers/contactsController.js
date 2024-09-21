import contact from "../models/contact.js";
import mongoose from "mongoose";


export const getAllContacts = async (req, res) => {

    try {
        const contacts =  await contact.find({owner_id: req.user.id});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({msg: `${error}`});
    }

}

export const getContactById = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: `Invalid ID format` });
    }

    try {
        const t_contact = await contact.findById(id);

        if( !t_contact ) {
            return res.status(404).json({msg: 'Contact not found!'});
        }

        if( t_contact.owner_id.toString() !== req.user.id ) {
            return res.status(403).json({msg: "Forbidden!"});
        }

        res.status(200).json(t_contact);
    } catch (error) {
        res.status(500).json({msg: `${error}`});
    }

}

export const deleteContact = async (req, res) => {
    const {id} = req.params;

    if( !mongoose.isValidObjectId(id) ) {
        return res.status(400).json({msg: 'Invalid ID format'});
    }

    try {

        // Find the contact by ID first to check ownership
        const contactToDelete = await contact.findById(id);

        if( !contactToDelete ) {
            return res.status(404).json({msg: `Contact not found!`});
        }

        if( contactToDelete.owner_id.toString() !== req.user.id ) {
            return res.status(403).json({msg: 'Your not authorized to delete that post!'});
        }

        // If authorized, proceed to delete the contact
        await contact.findByIdAndDelete(id);

        res.status(200).json({msg: `Contact deleted successfully!`});
        
    } catch (error) {
        res.status(500).json({msg: `${error}`});
    }

}

export const updateContact = async (req, res) => {
    const {id} = req.params;

    if( !mongoose.isValidObjectId(id) ) {
        return res.status(400).json({msg: 'Invalid ID format'});
    }

    try {

        const contactToUpdate = await contact.findById(id);

        if( !contactToUpdate ) {
            return res.status(404).json({msg: `Contact not found!`});
        }

        if( contactToUpdate.owner_id.toString() !== req.user.id ) {
            return res.status(403).json({msg: 'You not allowed to update this post'});
        }

        await contact.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

        res.status(201).json({msg: "Contact updated successfully!"});
        
    } catch (error) {
        res.status(500).json({msg: `${error}`});
    }
}

export const createContact =  async (req, res) => {
    try {
        const newContact = { ...req.body, owner_id: req.user.id };
        await contact.create(newContact);
        res.status(201).json(newContact); 
    } catch (error) {
        res.status(500).json({ msg: `${error.message}` });
    }
}


export const searchContact = async (req, res) => {
    const { query } = req.query;

    try {
        const contacts = await contact.find({
            owner_id: req.user.id,
            $or: [
                { firstname: { $regex: query, $options: 'i' } },
                { lastname: { $regex: query, $options: 'i' } },
                { telno: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
            ]
        })
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ msg: `${error.message}` });
    }

}