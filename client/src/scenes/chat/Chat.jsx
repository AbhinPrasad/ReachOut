import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatBox from "../../components/ChatBox/ChatBox";
import Navbar from "../navbar";
import ConversationWidget from "../widgets/ConversationWidget";
import "./chat.css";
import { io } from "socket.io-client";
import { userChats } from "../../api/ChatRequest";
const Chat = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const socket = useRef();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers, "onlineUsers");
    });
  }, [user]);

  //Recieve messages from the socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);


    // Get the chat in chat section
  useEffect(() => {

    const getChats = async () => {
      try {
        const { data } = await userChats(user._id,{ headers: { Authorization: `Bearer ${token}` }});
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <Box>
      <Navbar />
      <Box>
        <div className="Chat">
          {/* Left Side */}
          <div className="Left-side-chat">
            <div className="Chat-container">
              <h2>Chat</h2>
              <div className="Chat-list">
                {chats.map((chat) => (
                  <div
                    onClick={() => {
                      setCurrentChat(chat);
                    }}
                  >
                    <ConversationWidget
                      data={chat}
                      currentUserId={user._id}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="Right-side-chat">
            <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
            {/* Chat Body */}
            <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
