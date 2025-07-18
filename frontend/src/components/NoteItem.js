import { useState, useEffect, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdSave } from "react-icons/md";

export default function NoteItem(props) {

    const { note, deleteNote, updateNote, setAlert } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedDescription, setEditedDescription] = useState(note.description);
    const [editedTag, setEditedTag] = useState(note.tag.join(", "));

    const textareaRef = useRef(null);
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [isEditing]);
    const handleDeleteClick = async () => {
        await deleteNote(note._id);
        setAlert({ message: "Note deleted!", type: "Success" });
        props.fetchNotes();
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const updatedNote = {
            title: editedTitle,
            description: editedDescription,
            tag: editedTag.split(",").map(t => t.trim()),
        };

        await updateNote(note._id, updatedNote);
        setIsEditing(false);
        setAlert({ message: "Note updated!", type: "Success" });
        props.fetchNotes();
    };

    return (
        <div className="p-4">
            <div className="flex flex-col w-80 bg-neutral-800 rounded-lg shadow-lg p-4 space-y-2">
                <div>
                    <div className="flex items-center justify-between">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="text-lg font-semibold text-white mb-2 bg-neutral-800 px-2 py-1 rounded w-full"
                            />
                        ) : (
                            <h2 className="text-lg font-semibold text-white mb-2">
                                {note.title}
                            </h2>
                        )}
                        {note.date && (
                            <span className="text-xs text-gray-400 my-5 mx-2">
                                {new Date(note.date).toLocaleDateString()}
                            </span>
                        )}
                    </div>

                    {isEditing ? (
                        <textarea
                            ref={textareaRef}
                            value={editedDescription}
                            onChange={(e) => {
                                setEditedDescription(e.target.value);
                                e.target.style.height = 'auto'; // reset to calculate new height
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            className="text-sm text-gray-300 bg-neutral-800 px-2 py-1 rounded w-full resize-none overflow-hidden min-h-[60px]"
                        />



                    ) : (
                        <p className="text-sm text-gray-300 break-words whitespace-pre-wrap">
                            {note.description}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <div className="mt-2 flex flex-wrap gap-1">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedTag}
                                onChange={(e) => setEditedTag(e.target.value)}
                                placeholder="Enter tags, comma-separated"
                                className="text-xs text-neutral-400 bg-neutral-700 px-2 py-1 rounded"
                            />
                        ) : (
                            note.tag?.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs text-neutral-400 bg-neutral-700 px-2 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))
                        )}
                    </div>

                    {isEditing ? (
                        <MdSave
                            className="cursor-pointer text-blue-500 text-xl mt-2"
                            onClick={handleSaveClick}
                        />
                    ) : (
                        <FaRegEdit
                            className="cursor-pointer text-amber-500 text-xl mt-2"
                            onClick={handleEditClick}
                        />
                    )}

                    <RiDeleteBinLine
                        className="cursor-pointer text-red-500 text-xl mt-2"
                        onClick={handleDeleteClick}
                    />
                </div>
            </div>
        </div>
    );
}
