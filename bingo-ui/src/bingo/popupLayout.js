import React from "react";

const PopupLayout = (props) => {
  return (
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-black  bg-opacity-90 "
      id="popup"
    >
      <div class=" flex justify-center items-center  p-2  bg-white rounded-lg  w-[18rem] h-[10rem] text-center shadow-2xl shadow-gray-500">
        {props.children}
        
      </div>
    </div>
  );
};

export default PopupLayout;
