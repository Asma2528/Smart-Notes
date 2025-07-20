import { useContext, useState } from "react";
import notesContext from "../context/Notes/NotesContext";

export default function AddNoteItem(props) {
  const context = useContext(notesContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const validate = () => {
    const newErrors = {};

    if (!note.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!note.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (note.description.length < 5) {
      newErrors.description = "Description must be at least 5 characters.";
    }


    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };



  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClick = (e) => {
    e.preventDefault();


    if (!validate()) {
      return; // Stop submission if validation fails
    }

    const tagArray = note.tag.split(",").map((tag) => tag.trim()).filter(Boolean);

    addNote({
      title: note.title,
      description: note.description,
      tag: tagArray
    });

    setNote({ title: "", description: "", tag: "" }); // Reset form
    setErrors({}); // Clear errors on success
    props.setAlert({ message: "Note added!", type: "Success" });

    props.fetchNotes();
  };

  return (
    <div className="p-2">
      <div
        className={`bg-amber-200 dark:bg-neutral-700 rounded-lg shadow-lg p-4 space-y-2
    transition-all duration-300 ease-in-out
    ${isFocused ? "w-96 max-h-[28rem]" : "w-80 max-h-[20rem]"}`}
        style={{ overflow: "hidden" }} // important to hide overflow when animating height
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          required
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full p-2 text-sm placeholder-amber-800 dark:placeholder-neutral-300 text-black rounded-md border-2 border-amber-600 dark:border-cyan-700 focus:outline-none focus:ring-2 dark:focus:ring-cyan-500 focus:ring-amber-500 bg-amber-200 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
        />
        {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
        <textarea
          rows="4"
          name="description"
          placeholder="Description"
          minLength="5"
          required
          value={note.description}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full p-2 text-sm placeholder-amber-800 dark:placeholder-neutral-300 text-black rounded-md border-2 border-amber-600 dark:border-cyan-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-cyan-500 dark:bg-neutral-700 bg-amber-200 dark:text-white dark:border-neutral-600"
        />
        {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
        <input
          type="text"
          name="tag"
          placeholder="Tags (comma separated)"
          value={note.tag}
          required
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full p-2 text-sm placeholder-amber-800 dark:placeholder-neutral-300 text-black rounded-md border-2 border-amber-600 dark:border-cyan-700 focus:outline-none focus:ring-2 dark:focus:ring-cyan-500 focus:ring-amber-500 bg-amber-200 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
        />

        <button
          onClick={handleClick}
          className="w-full bg-amber-500 hover:bg-amber-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:text-white font-semibold py-2 rounded-md transition-colors duration-200"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}
