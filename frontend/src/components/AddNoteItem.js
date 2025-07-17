import { useContext, useState } from "react";
import notesContext from "../context/Notes/NotesContext";

export default function AddNoteItem() {
  const context = useContext(notesContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();

 const tagArray = note.tag.split(",").map((tag) => tag.trim()).filter(Boolean);


  addNote({
    title: note.title,
    description: note.description,
    tag: tagArray
  });

    setNote({ title: "", description: "", tag: "" }); // Reset form
  };

  return (
    <div className="p-2">
      <div className="w-80 bg-neutral-700 rounded-lg shadow-lg p-4 space-y-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleChange}
          className="w-full p-2 text-sm rounded-md border-2 border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
        />

        <textarea
          rows="4"
          name="description"
          placeholder="Description"
          value={note.description}
          onChange={handleChange}
          className="w-full p-2 text-sm rounded-md border-2 border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
        />

        <input
          type="text"
          name="tag"
          placeholder="Tags (comma separated)"
          value={note.tag}
          onChange={handleChange}
          className="w-full p-2 text-sm rounded-md border-2 border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
        />

        <button
          onClick={handleClick}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}
