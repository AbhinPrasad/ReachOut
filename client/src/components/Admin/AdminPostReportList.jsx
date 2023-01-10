import React, { useEffect, useState } from "react";
import { Table, Divider, Tag, Button } from "antd";
import axios from "axios";
import SinglePostView from "./SinglePostView";
import {
  postDeleteAdmin,
  reportedPOstsAdmin,
  viewPostAdmin,
} from "../../api/AdminRequest";

const AdminPostReportList = () => {
  const [post, setPost] = useState([]);
  const [singlePost, setSinglePost] = useState();
  const [loading, setLoading] = useState(true);
  const { Column } = Table;
  useEffect(() => {
    const getReportedPosts = async () => {
      const response = await reportedPOstsAdmin();
      console.log(response, "haiii");
      if (response.data.success) {
        setPost(response.data.formattedPosts);
      }
    };

    getReportedPosts();
  }, []);

  const postDelete = async (postId) => {
    console.log(postId, "noww post Id ");

    const response = await postDeleteAdmin(postId);
    console.log(response, "haii");
    if (response.data.success) {
      console.log(response.data.newposts);
      let updatedPosts = response.data.newposts;
      console.log(updatedPosts, "ithannu new posts");
    }
  };

  const viewPost = async (postId) => {
    const response = await viewPostAdmin(postId);

    if (response.data.success) {
      let userPost = response.data.post;
      console.log(userPost, "ithannu new posts");
      setLoading(false);
      setSinglePost(userPost);
    }
  };

  return (
    <div>
      {loading ? (
        <Table dataSource={post}>
          <Column title="UserName" dataIndex="firstName" key="firstName" />
          <Column title="Post Id" dataIndex="_id" key="PostId" />
          <Column title="Location" dataIndex="location" key="location" />
          <Divider type="vertical" />

          <Column
            title="Action"
            key="action"
            render={(record) => (
              <span>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    if (window.confirm("Do you want to Delete this user?"))
                      postDelete(record._id);
                  }}
                >
                  Delete
                </Button>
              </span>
            )}
          />

          <Column
            title="Action"
            key="action"
            render={(record) => (
              <span>
                <Button
                  type="primary"
                  onClick={() => {
                    viewPost(record._id);
                  }}
                >
                  View
                </Button>
              </span>
            )}
          />
        </Table>
      ) : (
        <SinglePostView singlePost={singlePost} setLoading={setLoading} />
      )}
    </div>
  );
};

export default AdminPostReportList;
