/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const Notecard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onDelete,
  onEdit,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div  className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin className={`icon-btn ${isPinned?'text-primary':'text-slate-300'}`} onClick={onPinNote}/>
      </div>

      <p className="text-xs text-slate-600 mt-6">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex-xs text-slate-500">{tags}</div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Notecard;
