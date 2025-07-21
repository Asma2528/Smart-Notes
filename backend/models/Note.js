const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: [String],
    default: []
  },
  pinned: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  },
  trashed: {
    type: Boolean,
    default: false
  },
     trashedAt: {
        type: Date,
          default: null
    },
  reminder: {
    type: Date,
    default: null
  }
}, { timestamps: true });


const Note = mongoose.model('note', NotesSchema);

module.exports = Note;