"use client";
import { useEffect, useState } from "react";
import client from "@/services/client";
import { application } from "@/config/apis";
const Voice_Chat_History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await client.get(
          `${application.baseUrl}/chat_History`
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
    <div>
      <h2>Chat History</h2>
      <ul>
        {history.map((entry: any) => (
          <li key={entry._id}>
            User: {entry.command}
            <br />
            Bot: {entry.response}
            <br />
            Timestamp: {entry.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voice_Chat_History;
