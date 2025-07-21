const express = require('express')
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// Route to fetch all notes
router.get('/fetch-all-notes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id ,  trashed: false, 
            archived: false });

        res.json(notes);


    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

// Route to fetch archived notes
router.get('/fetch-archived-notes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id ,  trashed: false, 
            archived: true });

        res.json(notes);


    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

// Route to fetch trash notes
router.get('/fetch-trash-notes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id ,  trashed: true, 
            archived: false });

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

// Route to pin an existing note
router.put('/pin-note/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be pinned and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: { pinned: true } }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

// Route to unpin an existing note
router.put('/unpin-note/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be unpinned and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: { pinned: false } }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});


// Route to trash an existing note
router.put('/trash-note/:id', fetchuser, async (req, res) => {
    try {
        // Find the note
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }

        // Authorization check
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Mark as trashed and set trashedAt
        note = await Note.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    trashed: true,
                    trashedAt: new Date()
                }
            },
            { new: true }
        );

        res.json({ note });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});


// Route to untrash an existing note
router.put('/untrash-note/:id', fetchuser, async (req, res) => {
    try {
        // Find the note
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }

        // Authorization check
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Unmark as trashed and clear trashedAt
        note = await Note.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    trashed: false,
                    trashedAt: null
                }
            },
            { new: true }
        );

        res.json({ note });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});


// Route to archive an existing note
router.put('/archive-note/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be archive and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: { archived: true } }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});


// Route to archive an existing note
router.put('/unarchive-note/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be archive and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: { archived: false } }, { new: true });
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

// Route to delete all trash notes
router.delete('/empty-bin', fetchuser, async (req, res) => {
    try {
        // Delete all trashed notes that belong to the current user
        const result = await Note.deleteMany({
            user: req.user.id,
            trashed: true
        });

        res.json({
            success: true,
            message: `${result.deletedCount} trashed notes deleted.`
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

router.put('/set-reminder/:id', fetchuser, async (req, res) => {
  const { reminder } = req.body;

  if (!reminder) {
    return res.status(400).json({ error: "Reminder time is required" });
  }

  if (new Date(reminder) < new Date()) {
  return res.status(400).json({ error: "Reminder time must be in the future" });
}

  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    note.reminder = new Date(reminder);
    await note.save();

    res.json({ success: true, message: "Reminder set", note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


router.put('/clear-reminder/:id', fetchuser, async (req, res) => {
 
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    note.reminder = null;
    await note.save();

    res.json({ success: true, message: "Reminder cleared", note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get('/fetch-reminders', fetchuser, async (req, res) => {
  try {
    const notesWithReminders = await Note.find({
      user: req.user.id,
      reminder: { $ne: null }
    }).sort({ reminder: 1 });

    res.json(notesWithReminders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



module.exports = router;