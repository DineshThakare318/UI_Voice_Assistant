// "use client";
// const getData = async () => {
//   try {
//     const response = await client.get(
//       `${application.baseUrl}${ENDPOINTS.HELLO}`
//     );
//     return response;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return error;
//   }
// };

// import { ENDPOINTS, application } from "@/config/apis";
// import client from "@/services/client";
// import { useEffect, useRef, useState } from "react";
// interface IProps {
//   data: any[];
// }
// export const ChatHistory: React.FC<IProps> = ({ data }) => {
//   const [message, setMessage] = useState("");
//   const userDataInitialState: {
//     email: string;
//     password: string;
//     username: string;
//   } = { email: "", password: "", username: "" };
//   const loginInitialState: {
//     password: string;
//     username: string;
//   } = { password: "", username: "" };
//   const [userData, setUserData] = useState<{
//     email: string;
//     password: string;
//     username: string;
//   }>(userDataInitialState);
//   const [loginData, setLoginData] = useState<{
//     question: string;
//     previous_data: any;
//   }>({ previous_data: [], question: "" });
//   useEffect(() => {
//     getAPIData();
//   }, []);
//   const getAPIData = async () => {
//     const res: any = await getData();
//     setMessage(res?.data?.message);
//   };
//   const submitForm = async () => {
//     try {
//       const response = await client.post(
//         `${application.baseUrl}/users`,
//         userData
//       );
//       console.log("************************************************", response);
//       setUserData(userDataInitialState);
//       return response;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return error;
//     }
//   };
//   const login = async () => {
//     try {
//       const response = await client.post(
//         `${application.baseUrl}/chat`,
//         loginData
//       );
//       console.log(
//         "************************************************",
//         response?.data[0]?.data
//       );
//       setLoginData({ previous_data: [], question: "" });
//       return response;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return error;
//     }
//   };
//   useEffect(() => {
//     setChatData(data);
//   }, [data]);

//   useEffect(() => {
//     if (data.length) {
//       ref.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//       });
//     }
//   }, [data.length]);

//   const [chatData, setChatData] = useState<any[]>([]);

//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (data.length) {
//       ref.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//       });
//     }
//   }, [data.length, data[data?.length - 1]]);

//   return (
//     <div className="overflow-y-scroll  max-h-full overflow-x-hidde">
//       <div className="w-full h-full flex justify-center items-end ">
//         <div className="w-full h-full">
//           {chatData?.map((ele: any) => (
//             <>
//               {ele?.question && question(ele?.question, ele?.time)}
//               {ele?.answer && answer(ele?.answer, ele?.time)}
//             </>
//           ))}
//         </div>
//         <div ref={ref} />
//       </div>
//     </div>
//   );
// };

// const question = (question: string, time: string) => {
//   return (
//     <div className="m-1 my-3">
//       <div className="w-full flex justify-end items-center relative">
//         <span className="w-fit max-w-[80%] m-1 flex justify-end items-center pl-4 p-2 rounded-t-xl rounded-bl-xl bg-green-100">
//           {question}
//         </span>
//       </div>
//       <span className="text-xs w-full flex justify-end items-center">
//         {time}
//       </span>
//     </div>
//   );
// };

// const answer = (answer: string, time: string) => {
//   return (
//     <div className=" m-1 my-3">
//       <div className="w-full flex justify-start items-center relative">
//         <span className="w-fit max-w-[80%] -my-1 flex justify-end items-center pl-4 p-2 rounded-b-xl rounded-tr-xl bg-gray-200">
//           {answer}
//         </span>
//       </div>
//       <span className="text-xs">{time}</span>
//     </div>
//   );
// };
