/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, settags }) => {
  const [inputValue, setinputValue] = useState("");
  const handleinputchange = (e) => {
    setinputValue(e.target.value);
  };
  const addNewTag = () => {
    if (inputValue.trim() != "") {
      settags([...tags, inputValue.trim()]);
      setinputValue("");
    }
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  const handleRemoveTag = (tagtoRemove) => {
    settags(tags.filter((tag) => tag != tagtoRemove));
  };
  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              #{tag}
              <button
                className=""
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border px-3 py-2 rounder outline-none"
          placeholder="Add tags"
          onChange={handleinputchange}
          onKeyDown={handleKeydown}
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 "
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
