const express = require('express')
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// Route to fetch all notes
router.get('/fetch-all-notes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        console.log(notes);
        
        res.json(notes);


    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

// Route to add a new note
router.post('/add-note', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    // If there are errors, return them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;

         const note = new Note({
            title,
            description,
            tag,
            user: req.user.id 
        });

      const savedNote = await note.save(); 
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});


// Route to update an existing note
router.put('/update-note/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

// Route to delete a note
router.delete('/delete-note/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;