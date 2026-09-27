import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

const Chatbox = () => {
  const connections = useSelector((store) => store.connections);

  const { toUserId } = useParams();
  const userData = useSelector((store) => store.user);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();

    socket.emit("joinChat", { firstName, userId, toUserId });
    console.log("chat joined");

    socket.on(
      "receiveMessage",
      ({ firstName, userId, toUserId, text, sendAt }) => {
        console.log(
          firstName,
          "'s message received: ",
          text,
          formatTime(sendAt),
        );
        setMessage((messages) => [
          ...messages,
          { firstName, userId, toUserId, text, sendAt },
        ]);
      },
    );

    return () => {
      socket.disconnect();
    };
  }, [firstName, userId, toUserId]);

  const toUseData = connections?.find(
    (connection) => connection._id === toUserId,
  );

  const sendMessages = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      userId,
      toUserId,
      text: newMessage,
      sendAt: new Date().toISOString(),
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col  my-10 bg-base-100 m-5 h-[calc(75vh)] border border-gray-300 rounded-lg">
      <h1 className="text-center text-3xl p-2">Chat</h1>
      <div className="flex-1 overflow-auto p-5">
        {messages.length === 0 && (
          <div className="flex flex-col justify-center my-30">
            <h1 className="text-center text-3xl my-2">No messages yet!</h1>
            <p className="text-center">Start the conversation</p>
          </div>
        )}
        {messages.length > 0 &&
          messages.map((msg, index) => {
            const isMyMessage = msg.userId === userId;
            return (
              <div
                key={index}
                className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt={isMyMessage ? "User Avatar" : "Other User Avatar"}
                      src={
                        isMyMessage ? userData.photoUrl : toUseData?.photoUrl
                      }
                    />
                  </div>
                </div>

                <div className="chat-header">
                  {isMyMessage ? userData.firstName : toUseData?.firstName}
                  <time className="text-xs opacity-50">
                    {formatTime(msg.sendAt)}
                  </time>
                </div>

                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">
                  {isMyMessage ? "Sent" : "Received"}
                </div>
              </div>
              // <div key={index}>
              //   <div className="chat chat-start">
              //     <div className="chat-image avatar">
              //       <div className="w-10 rounded-full">
              //         <img alt="To User Avatar" src={toUseData?.photoUrl} />
              //       </div>
              //     </div>
              //     <div className="chat-header">
              //       {toUseData?.firstName}
              //       <time className="text-xs opacity-50">12:45</time>
              //     </div>
              //     <div className="chat-bubble">You were the Chosen One!</div>
              //     <div className="chat-footer opacity-50">Delivered</div>
              //   </div>
              //   <div className="chat chat-end">
              //     <div className="chat-image avatar">
              //       <div className="w-10 rounded-full">
              //         <img alt="User Avatar" src={userData.photoUrl} />
              //       </div>
              //     </div>
              //     <div className="chat-header">
              //       {userData.firstName}
              //       <time className="text-xs opacity-50">12:46</time>
              //     </div>
              //     <div className="chat-bubble">{msg.text}</div>
              //     <div className="chat-footer opacity-50">Seen at 12:46</div>
              //   </div>
              // </div>
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
