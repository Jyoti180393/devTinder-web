import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Chatbox = () => {
  const connections = useSelector((store) => store.connections);

  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  // const { firstName, photoUrl } = user;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");

  const formatTime = (timeString) => {
    if (!timeString) return "";

    const date = new Date(timeString);

    if (Number.isNaN(date.getTime())) return "";

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12;
    const amPm = hours >= 12 ? "PM" : "AM";

    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  };

  // const fetchChatHistory = async () => {
  //   try {
  //     const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
  //       withCredentials: true,
  //     });

  //     const chatMessages = res?.data?.messages?.map((message) => {
  //       const { senderId, text, createdAt } = message;
  //       return {
  //         firstName: senderId?.firstName,
  //         photoUrl: senderId?.photoUrl,
  //         text,
  //         sendAt: createdAt,
  //       };
  //     });

  //     setMessages(chatMessages);
  //   } catch (err) {
  //     console.error("Error fetching chat history: ", err);
  //   }
  // };

  useEffect(() => {
    let ignore = false;

    // this flag is used to prevent state updates if the component unmounts before
    // the async operation completes

    const loadChatHistory = async () => {
      try {
        setError("");
        const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
          withCredentials: true,
        });

        const chatMessages = (res.data?.messages ?? []).map((message) => ({
          senderId: message.senderId?._id,
          firstName: message.senderId?.firstName,
          photoUrl: message.senderId?.photoUrl,
          text: message.text,
          sendAt: message.createdAt,
        }));

        if (!ignore) {
          setMessages(chatMessages);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error fetching chat history: ", err?.response?.data);
          setError(
            err?.response?.data ||
              "Something went wrong while fetching chat history",
          );
        }
      }
    };

    // check if targetUserId is defined before calling loadChatHistory
    if (targetUserId) {
      loadChatHistory();
    }

    return () => {
      ignore = true;
    };
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      userId,
      targetUserId,
      firstName: user?.firstName,
    });

    socket.on("receiveMessage", ({ firstName, photoUrl, text, sendAt }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, photoUrl, text, sendAt },
      ]);
      console.log("message received: ", text);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user?.firstName]);

  const toUseData = connections?.find(
    (connection) => connection._id === targetUserId,
  );

  const sendMessages = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      photoUrl: user.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
      sendAt: new Date().toISOString(),
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col  my-10 bg-base-100 m-5 h-[calc(75vh)] border border-gray-300 rounded-lg">
      <h1 className="text-center text-3xl p-2">Chat</h1>
      <div className="flex-1 overflow-auto p-5">
        {error && (
          <div className="flex h-full min-h-52 items-center justify-center">
            <p className="text-red-500 leading-6 text-3xl text-center">
              {error}
            </p>
          </div>
        )}
        {messages.length === 0 && !error && (
          <div className="flex flex-col justify-center my-30">
            <h1 className="text-center text-3xl my-2">No messages yet!</h1>
            <p className="text-center">Start the conversation</p>
          </div>
        )}
        {messages.length > 0 &&
          !error &&
          messages.map((msg, index) => {
            const isMyMessage = msg.firstName === user?.firstName;
            return (
              <div
                key={index}
                className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt={isMyMessage ? "User Avatar" : "Other User Avatar"}
                      src={msg?.photoUrl}
                    />
                  </div>
                </div>

                <div className="chat-header">
                  {isMyMessage ? user?.firstName : toUseData?.firstName}
                  <time className="text-xs opacity-50">
                    {formatTime(msg.sendAt)}
                  </time>
                </div>

                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">
                  {isMyMessage ? "Sent" : "Received"}
                </div>
              </div>
            );
          })}
      </div>

      <div className="flex border-t p-5 border-gray-300 items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type here"
          className="flex-1 border border-gray-500  text-white rounded p-2"
        />
        <button
          className="btn btn-primary-content bg-white text-black text-sm rounded-3xl mx-2"
          onClick={sendMessages}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
