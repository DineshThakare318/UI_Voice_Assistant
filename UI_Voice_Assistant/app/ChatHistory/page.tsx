"use client";
import { useEffect, useState, useRef } from "react";
import client from "@/services/client";
import { application } from "@/config/apis";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
const ChatHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await client.get(`${application.baseUrl}/chathistory`);
        setHistory(response.data[0].data);
        console.log(response.data[0].data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <div className="flex flex-col h-screen pt-3 bg-[url('/bgAI2.jpg')] bg-cover ">
      <div className="flex gap-96 pb-3 items-center  ">
        <Link href="/home">
          <BiLeftArrowAlt className="h-6 w-40 text-white" />
        </Link>
        <p className="flex justify-center items-center pl-14 text-white text-[25px] ">
          Chat History
        </p>
      </div>
      <div className="flex justify-center h-5/6 ">
        <div className="w-3/6  flex flex-col justify-center items-center  bg-slate-900 rounded-xl py-3 overflow-y-scroll">
          <div className="w-full   py-2 ">
            {loading ? (
              <p className=" flex justify-center pt-45 text-[20px] text-white items-center">
                Loading...
              </p>
            ) : history.length > 0 ? (
              <>
                {" "}
                {history.map((entry: any) => (
                  <div key={entry._id} className="px-2">
                    {entry?.command && command(entry?.command, entry?.time)}
                    {entry.response && response(entry?.response, entry?.time)}
                  </div>
                ))}
              </>
            ) : (
              <div className="flex justify-center h-full items-center text-orange-500 font-semibold">
                {"No data found"}
              </div>
            )}
          </div>
          <div ref={ref} />
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;

const command = (question: string, time: string) => {
  return (
    <div className="m-1 ">
      <div className="w-full flex justify-end items-center relative">
        <span className="w-fit text-white max-w-[70%] m-1 flex justify-end items-center pl-4 p-2 rounded-t-xl rounded-bl-xl bg-gray-600 ">
          {question}
        </span>
      </div>
      <span className="text-xs w-full flex justify-end items-center text-gray-400">
        {time}
      </span>
    </div>
  );
};

const response = (answer: string, time: string) => {
  return (
    <div className=" m-1 my-3">
      <div className="w-full flex justify-start items-center relative">
        <span className="w-fit max-w-[80%] text-white -my-1 flex justify-end items-center pl-4 p-2 rounded-b-xl rounded-tr-xl bg-green-600 ">
          {answer.includes("https") ? answer.slice(0, 470) : answer}
        </span>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
};
