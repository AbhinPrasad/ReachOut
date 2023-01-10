import React from "react";

import { Table, Divider, Tag, Button } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { blockUserAdmin, unBlockUserAdmin, usersDataAdmin } from "../../api/AdminRequest";

const AdminUsersList = () => {
  const [user, setUser] = useState([]);
  const [active, setActive] = useState([]);

  const { Column } = Table;

  const blockUser = async (userID) => {
    try {
      const response = await blockUserAdmin(userID)
    

      if (response.data.success) {
        console.log("Blocked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unBlockUser = async (userID) => {
    try {
      const response = await unBlockUserAdmin(userID)
    

      if (response.data.success) {
        console.log("unBlocked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function usersList() {
      try {
        const response = await usersDataAdmin() 
      

        if (response.data.success) {
          console.log(response.data.formattedFriends, "first line admin");
          setUser(response.data.formattedFriends);
        }
      } catch (error) {
        console.log(error);
      }
    }
    usersList();
  }, []);

  return (
    <div>
      <Table dataSource={user ? user : ""}>
        <Column title="Name" dataIndex="firstName" key="firstName" />
        <Column title="Email" dataIndex="location" key="location" />
        <Column title="Email" dataIndex="email" key="age" />

        <Column
          title="Action"
          key="action"
          render={(record) => (
            <span>
           {record.Active ? (  <Button
                type="primary" 
                danger
                onClick={() => {
                  if (window.confirm("Do you want to block this user?"))
                    blockUser(record._id);

                }}
              >
                Block
              </Button>)

           :

             ( <Button
                type="primary"
                onClick={() => {
                  if (window.confirm("Do you want to unblock this user?"))
                    unBlockUser(record._id);
                }}
              >
                UnBlock
              </Button>)}
            </span>
          )}
        />
      </Table>
    </div>
  );
};
export default AdminUsersList;
