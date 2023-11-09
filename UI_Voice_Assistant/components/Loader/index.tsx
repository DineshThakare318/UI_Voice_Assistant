import React from "react";
import { useRecoilValue } from "recoil";
import {isLoadingState} from "../Loaderr/atom"
export default function Loader() {
  // const isLoading = useRecoilValue(isLoadingState)
  return (
    <div className="w-full h-[100%] flex flex-col justify-center items-center">
      <div className="w-[70px] loader-spinner h-[70px] border-8 rounded-full bg-transparent border-r-[#19C37D]"></div>
    </div>
  );
}
