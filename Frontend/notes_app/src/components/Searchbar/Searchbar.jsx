// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const Searchbar = ({ value, onChange, HandleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        placeholder="Search"
        onChange={onChange}
      />
      {value&&
      <IoMdClose
        className="text-slate-500 cursor-pointer hover:text-black mr-3"
        onClick={onClearSearch}
      />}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={HandleSearch}
      />
    </div>
  );
}

export default Searchbar;
