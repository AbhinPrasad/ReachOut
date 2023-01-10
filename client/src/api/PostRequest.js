import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });



export const UserPostDelete = (postId) => API.post("/posts/post-delete", { postId });


export const UserPostReport = (postId, loggedInUserId) => API.patch(`/posts/${postId}/report`, { loggedInUserId });

export const PostData = (formData, header) => API.post("http://localhost:5000/posts", formData, header)

export const GetUserPostData = (userId, header) => API.get(`/posts/${userId}/posts`, header)

export const LikePost = (postId, userId, header) => API.patch(`/posts/${postId}/like`, { userId }, header)

export const CommentPost = (comment, userName, postId) => API.patch("/posts/comment", { comment, userName, postId })