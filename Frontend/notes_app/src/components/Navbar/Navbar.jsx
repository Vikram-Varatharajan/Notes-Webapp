// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../cards/ProfileInfo";
import Searchbar from "../Searchbar/Searchbar";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const onLogout = () => {
    navigate("/login");
  };

  const  HandleSearch=()=>{}
  const  onClearSearch=()=>{
    setSearchQuery("")
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h1 className="text-xl font-medium text-black py-2">Notes</h1>
      <Searchbar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        HandleSearch={HandleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
