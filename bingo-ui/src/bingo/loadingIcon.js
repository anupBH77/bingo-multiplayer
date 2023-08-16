import React from 'react';
import './loadingIcon.css';

export default function LoadingIcon() {
  return (
    <div className=" opacity-70  bg-gray-300  absolute inset-0 flex  justify-center items-center h-screen z-10">
      <div className="loading "></div>
      
    </div>
  );
}


