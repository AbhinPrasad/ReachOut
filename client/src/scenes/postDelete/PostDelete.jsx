import { Alert, AlertTitle, Button, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useCallback } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { setPost, setPosts } from "../../state";
import { UserPostDelete, UserPostReport } from "../../api/PostRequest";
import { useReducer } from "react";
const ITEM_HEIGHT = 48;

const PostDelete = ({ setLoading, postUserId, postId }) => {
  const [loaderDelete, setLoaderDelete] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const loggedInUserId = useSelector((state) => state.user._id);

  //Delete Post
  const deletePost = async (postId) => {
    console.log(postId, "herer post Id");
    const response = await UserPostDelete(postId);

    if (response.data.success) {
      setLoaderDelete(true);
      let updatedPosts = response.data.newposts;
      console.log(updatedPosts, "ithannu new posts");
      dispatch(setPost({ post: updatedPosts }));
      setLoading(false);
    }
  };

  //Report Post
  const reportPost = async (postId) => {
    console.log(postId, "noww post Id ");
    const response = await UserPostReport(postId, loggedInUserId);
    console.log(response, "report");
    if (response.data.success) {
      let updatedPosts = response.data.newposts;
      console.log(updatedPosts, "ithannu new posts");
      dispatch(setPost({ post: updatedPosts }));
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
       
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "40ch",
          },
        }}
      >
        {postUserId === loggedInUserId ? (
          <Alert
            severity="error"
            action={
              <Button
                size="medium"
                onClick={() => {
                  deletePost(postId);
                }}
              >
                Delete
              </Button>
            }
          >
           Are You  Sure?
          </Alert>
        ) : (
          <Alert
            severity="warning"
            action={
              <Button
                color="error"
                size="medium"
                onClick={() => {
                  reportPost(postId);
                }}
              >
                Report
              </Button>
            }
          >
            Are You Sure?
          </Alert>
        )}
      </Menu>
      
    </div>
  );
};

export default PostDelete;
