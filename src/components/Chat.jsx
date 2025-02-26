// // import React from 'react'

// import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   // console.log(targetUserId)
//   const [messages, setMessages] = useState([]);
//   const [newMessages, setNewMessages] = useState("");

//   const user = useSelector((store) => store.user);
//   const userId = user?._id;
//   const firstName = user?.firstName;
//   const lastName = user?.lastName;

//   const chatContainerRef = useRef(null);

//   // const fetchChatMessages = async () => {
//   //   const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//   //     withCredentials: true,
//   //   });
//   //   // console.log(chat.data.messages);
//   //   const chatMessages = chat?.data?.messages.map((msg) => {
//   //     return {
//   //       firstName: msg?.senderId?.firstName,
//   //       lastName: msg?.senderId?.lastName,
//   //       text: msg?.text,
//   //     };
//   //   });
//   //   setMessages(chatMessages);
//   // };

//   useEffect(() => {
//     const fetchChatMessages = async () => {
//       const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//         withCredentials: true,
//       });
//       // console.log(chat.data.messages);
//       const chatMessages = chat?.data?.messages.map((msg) => {
//         return {
//           firstName: msg?.senderId?.firstName,
//           lastName: msg?.senderId?.lastName,
//           text: msg?.text,
//         };
//       });
//       setMessages(chatMessages);
//     };
//     fetchChatMessages();
//   }, [targetUserId]);



 


//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (!userId) {
//       return;
//     }
//     const socket = createSocketConnection();
//     socket.emit("joinChat", { firstName, userId, targetUserId });

//     socket.on("messageReceived", ({ firstName, lastName, text }) => {
//       // console.log(firstName +": " + text)
//       setMessages((messages) => [...messages, { firstName, lastName, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [firstName,userId, targetUserId]);

//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessages", {
//       firstName,
//       lastName,
//       userId,
//       targetUserId,
//       text: newMessages,
//     });
//     setNewMessages("");
//   };

//   return (
//     <div className="border border-white h-4/5 w-1/2 mt-36 mx-auto rounded-xl ">
//       <div className="w-full h-96 cursor-pointer  overflow-y-scroll p-3 "   ref={chatContainerRef}>
//         {messages.map((msg, index) => {
//           return (
//             <div
//               key={index}
//               className={
//                 "chat" +
//                 (user.firstName === msg.firstName ? " chat-end" : " chat-start")
//               }
//             >
//               <div className="chat-header">
//                 {`${msg.firstName} ${msg.lastName}`}
//                 {/* <time className="text-xs opacity-50">2 hours ago</time> */}
//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               {/* <div className="chat-footer opacity-50">Seen</div> */}
//             </div>
//           );
//         })}
//       </div>

//       <div className=" flex justify-between border-t-2 border-white py-2  ">
//         <input
//           value={newMessages}
//           onChange={(e) => setNewMessages(e.target.value)}
//           className=" input input-bordered  text-white w-5/6 mx-auto"
//         ></input>
        
//         <button
//           className="btn btn-outline btn-success mr-2 font-bold text-lg mx-auto"
//           onClick={sendMessage}
//         >
//           {" "}
//           send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;






import  { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [targetUser, setTargetUser] = useState(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const chatContainerRef = useRef(null);

  // useEffect(() => {
  //   const fetchChatMessages = async () => {
  //     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
  //       withCredentials: true,
  //     });
  //     const chatMessages = chat?.data?.messages.map((msg) => {
  //       return {
  //         firstName: msg?.senderId?.firstName,
  //         lastName: msg?.senderId?.lastName,
  //         text: msg?.text,
  //       };
  //     });
  //     setMessages(chatMessages);
  //     setTargetUser(chat?.data?.targetUser);
  //   };
  //   fetchChatMessages();
  // }, [targetUserId]);



  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(BASE_URL + "/chat/" + targetUserId, {
          withCredentials: true,
        });
  
        const chatData = response?.data?.chat;
        const targetUserData = response?.data?.targetUser;
  
        const chatMessages = chatData?.messages
          ? chatData.messages.map((msg) => ({
              firstName: msg?.senderId?.firstName || "Unknown",
              lastName: msg?.senderId?.lastName || "",
              text: msg?.text || "",
            }))
          : [];
  
        setMessages(chatMessages);
        setTargetUser(targetUserData || null); // Now setting `targetUser`
  
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };
    fetchChatMessages();
  }, [targetUserId]);
  



  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [firstName, userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessages", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessages,
    });
    setNewMessages("");
  };

  return (
    <div className="flex flex-col items-center mt-20">
      {/* Chat Header */}
      {targetUser && (
        <motion.div 
          className="text-center text-blue-600 text-xl font-bold py-4 mb-4 w-1/2 border-b border-gray-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {messages.length===0?`Start Conversation with ${targetUser.firstName} ${targetUser.lastName}` :`Chat with ${targetUser.firstName} ${targetUser.lastName}`}
        </motion.div>
      )}

      <div className="border border-white h-4/5 w-1/2 rounded-xl ">
        <div className="w-full h-96 cursor-pointer overflow-y-scroll p-3" ref={chatContainerRef}>
          {messages.map((msg, index) => {
            return (
              <div
                key={index}
                className={
                  "chat" +
                  (user.firstName === msg.firstName ? " chat-end" : " chat-start")
                }
              >
                <div className="chat-header">
                  {`${msg.firstName} ${msg.lastName}`}
                </div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between border-t-2 border-white py-2">
          <input
            value={newMessages}
            onChange={(e) => setNewMessages(e.target.value)}
            className="input input-bordered text-white w-5/6 mx-auto"
          ></input>
          <button
            className="btn btn-outline btn-success mr-2 font-bold text-lg mx-auto"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;


