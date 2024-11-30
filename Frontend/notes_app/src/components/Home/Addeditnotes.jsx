/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import TagInput from "../input/TagInput";
import { MdClose } from "react-icons/md";

// eslint-disable-next-line no-unused-vars
const Addeditnotes = ({ noteData, type, onclose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, settags] = useState("");
  const [error, seterror] = useState("");
  const addNewNote=async()=>{}
  const editnote=async()=>{}

  const handleAddNote = () => {
    if (!title) {
      seterror("Please enter the title");
      return;
    }
    if (!content) {
      seterror("Please enter the content");
      return;
    }

    seterror("");
    if (type === "edit") {
      editnote();
      
    } else {
      addNewNote();
      
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onclose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Play FREE FIRE AT 6PM"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="w-full text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Play FREE FIRE AT 6PM"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tag} settags={settags} />
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        className="btn-primary font-medium mt-4  p-3"
        onClick={handleAddNote}
      >
        Add
      </button>
    </div>
  );
};

export default Addeditnotes;
