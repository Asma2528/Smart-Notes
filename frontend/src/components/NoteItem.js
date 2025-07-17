import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";


export default function NoteItem(props) {
    return (
        <div className="p-4">
            <div className="flex flex-col justify-between w-80 h-48 bg-neutral-800 rounded-lg shadow-lg p-4">
                <div>
                    <div className="flex items-center justify-between">
                        <h5 className="text-lg font-semibold text-white mb-2">
                            {props.note.title}
                        </h5>
                        {props.note.date && (
                            <span className="text-xs text-gray-400 my-5">
                                {new Date(props.note.date).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-300">
                        {props.note.description}
                    </p>
                </div>
                <div className="flex justify-end gap-3">
                    <div className="mt-2 flex flex-wrap gap-1">
                        {props.note.tag && props.note.tag.length > 0 &&
                            props.note.tag.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs text-neutral-400 bg-neutral-700 px-2 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))
                        }
                    </div>
                    <FaRegEdit className="cursor-pointer text-amber-500 text-xl mt-2" />
                    <RiDeleteBinLine className="cursor-pointer text-red-500 text-xl mt-2" />
                </div>
            </div>
        </div>
    );
}
