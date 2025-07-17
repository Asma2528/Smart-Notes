import NoteItem from './NoteItem'
import AddNoteItem from './AddNoteItem'
import notesContext from '../context/Notes/NotesContext';
import React, { useEffect, useContext } from 'react';

function Home() {

  const context = useContext(notesContext);
  const { notes, fetchNotes, updateNote, deleteNote } = context;

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <AddNoteItem />
      <div className="flex flex-col items-center mt-8">
        <h4 className="text-neutral-300 text-md font-semibold">OTHERS:</h4>
        <div className="flex flex-wrap justify-center gap-4 p-2">
          {notes.length === 0 && <p className="text-neutral-400">No notes available</p>}
          {notes.map((note) => { return <NoteItem key={note._id} note={note} updateNote={updateNote} deleteNote={deleteNote} /> })}
        </div>
      </div>
    </div>
  )
}

export default Home
