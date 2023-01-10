import React from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import PostDelete from "../postDelete/PostDelete";
import axios from "axios";
import { CommentPost, LikePost } from "../../api/PostRequest";
const ITEM_HEIGHT = 48;
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;

  const [loading, setLoading] = useState(true);

  const patchLike = async () => {
    const response = await LikePost(postId, loggedInUserId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
    //   method: "PATCH",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ userId: loggedInUserId }),
    // });
    console.log(response.data, "[atch likeee");

    if (response.data) {
      const updatedPost = response.data;
      dispatch(setPost({ post: updatedPost }));
    }
  };

  const patchComment = async () => {
    const userName = user.firstName + " " + user.lastName;

    const response = await CommentPost(comment, userName, postId);
    console.log(response.data, "hello");

    if (response.data) {
      dispatch(setPost({ post: response.data.newCommentPost }));
    }
  };

  return (
    <box>
      {loading ? (
        <WidgetWrapper m="2rem 0">
          <Friend
            friendId={postUserId}
            name={name}
            subtitle={location}
            userPicturePath={userPicturePath}
          />

          <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
          </Typography>
          {picturePath && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`http://localhost:5000/assets/${picturePath}`}
            />
          )}
          <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
              <FlexBetween gap="0.3rem">
                <IconButton onClick={patchLike}>
                  {isLiked ? (
                    <FavoriteOutlined sx={{ color: primary }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
                <Typography>{likeCount}</Typography>
              </FlexBetween>

              <FlexBetween gap="0.3rem">
                <IconButton onClick={() => setIsComments(!isComments)}>
                  <ChatBubbleOutlineOutlined />
                  <Typography>{comments.length}</Typography>
                </IconButton>

                {isComments && (
                  <FlexBetween gap="1.5rem">
                    <TextField
                      id="outlined-name"
                      label="Comment"
                      required
                      onChange={(e) => setComment(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <Button variant="outlined" onClick={patchComment}>
                            Post
                          </Button>
                        ),
                      }}
                    />
                    {/* value={name}
                  onChange={handleChange} */}
                  </FlexBetween>
                )}
              </FlexBetween>
            </FlexBetween>

            <IconButton>
              <PostDelete
                setLoading={setLoading}
                postUserId={postUserId}
                postId={postId}
              />
            </IconButton>
          </FlexBetween>
          {isComments && (
            <Box mt="0.5rem">
              {comments.map((comment, i) => (
                <Box key={`${name}-${i}`}>
                  <Divider />
                  <Typography sx={{ color: medium, m: "0.5rem 0", pl: "1rem" }}>
                    {comment.username}
                  </Typography>

                  <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment.comment}
                  </Typography>
                </Box>
              ))}
              <Divider />
            </Box>
          )}
        </WidgetWrapper>
      ) : (
        ""
      )}
    </box>
  );
};

export default PostWidget;
