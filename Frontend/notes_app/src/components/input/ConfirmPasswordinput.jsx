// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6"
// eslint-disable-next-line react/prop-types
const Passwordinput = ({ value, onChange, placeholder }) => {
  const [isShowpassword, setIsShowPassword] = useState(false);
  const toggleShowPassword=()=>{
    setIsShowPassword(!isShowpassword);
    setTimeout(() => {
      setIsShowPassword(false);
    }, 300); 
  }
  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowpassword ? "text" : "password"}
        placeholder={placeholder || "Re-enter Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {isShowpassword ?(<FaRegEye
      size={22} 
      className="text-blue-600 cursor-pointer "
      onClick={()=>toggleShowPassword()}/>):
      (<FaRegEyeSlash
        size={22}
        className="text-slate-400 cursor-pointer"
        onClick={()=>toggleShowPassword()}
      />)}
    </div>
  );
};

export default Passwordinput;
