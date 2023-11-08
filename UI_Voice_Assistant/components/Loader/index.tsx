import React from "react";

export default function Loader() {
  return (
    <div className="w-full h-[100%] flex flex-col justify-center items-center">
      <div className="w-[70px] loader-spinner h-[70px] border-8 rounded-full bg-transparent border-r-[#19C37D]"></div>
    </div>
  );
}
