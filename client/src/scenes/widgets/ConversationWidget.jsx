import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../api/UserRequest";

const ConversationWidget = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const { data } = await getUserProfile(userId, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(data);
      } catch (error) {
        console.log(error, "paraa");
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}

          <img
            src={`http://localhost:5000/assets/${
              userData ? userData.picturePath : console.log("nothinggg")
            }`}
            alt="user"
            className="followerImage"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData ? userData.firstName : ""}{" "}
              {userData ? userData.lastName : ""}
            </span>
            <br />
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default ConversationWidget;
