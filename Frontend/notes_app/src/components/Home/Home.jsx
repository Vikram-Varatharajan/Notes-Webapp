// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Notecard from "../cards/Notecard";
import { MdAdd } from "react-icons/md";
import Addeditnotes from "./Addeditnotes";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, setopenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mx-8 mt-8 ">
          <Notecard
            title="Meeting Date"
            date="18th Jan 2025"
            content="Meeting Date Meeting Date"
            tags="#Meeting"
            isPinned={true}
            onDelete={() => {}}
            onEdit={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-20"
        onClick={()=>{setopenAddEditModal({isShown:true,type:"add",data:null})}}>
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal  
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay:{
          background:"rgba(0,0,0,0.2)",
        },
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll\">
      <Addeditnotes 
      type={openAddEditModal.type}
      noteData={openAddEditModal.data} onclose={()=>{
        setopenAddEditModal({isShown:false,type:"add",data:null})
      }}/>
</Modal>
    </>
  );
};

export default Home;
