"use client";
import { useEffect, useState,useRef } from "react";
import client from "@/services/client";
import { application } from "@/config/apis";
import Link from "next/link";
const  ChatHistory =()=> {
    const [history, setHistory] = useState([]);
    console.log('history: ', history.length);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const fetchChatHistory = async () => {
        try {
          const response = await client.get(
            `${application.baseUrl}/chathistory`
          );
          setHistory(response.data[0].data);
          console.log(response.data[0].data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchChatHistory();
    }, []);
  
    return (
      <div className="flex flex-col overflow-y-scroll  h-screen overflow-x-hidden  ">
        <div className="w-full h-full flex justify-center">
          <div className="w-1/4 h-[70%] overflow-y-scroll">
        {history.length>0 ? <>  {history.map((entry: any) => (
              <div key={entry._id}>
               {  entry?.command  && command(entry?.command,entry?.time) }
               { entry.response && response(entry?.response , entry.time) }
            </div>
          ))}</> : <div className="flex justify-center h-full items-center text-orange-500 font-semibold">{"No data found"}</div> }
        </div>
        <div ref={ref} />
        </div>
        <div className="flex justify-center  "><Link href="/"> Go to main page</Link></div>
      </div>
    );
}

export default ChatHistory;

const command = (question: string, time: string) => {
    return (
      <div className="m-1 my-3">
        <div className="w-full flex justify-end items-center relative">
          <span className="w-fit max-w-[80%] m-1 flex justify-end items-center pl-4 p-2 rounded-t-xl rounded-bl-xl bg-green-100">
            {question}
          </span>
        </div>
        <span className="text-xs w-full flex justify-end items-center">
          {time}
        </span>
      </div>
    );
  };
  
  const response = (answer: string, time: string) => {
    return (
      <div className=" m-1 my-3">
        <div className="w-full flex justify-start items-center relative">
          <span className="w-fit max-w-[80%] -my-1 flex justify-end items-center pl-4 p-2 rounded-b-xl rounded-tr-xl bg-gray-200">
            {answer}
          </span>
        </div>
        <span className="text-xs">{time}</span>
      </div>
    );
  };
  