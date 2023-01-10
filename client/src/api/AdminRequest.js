import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });



export const reportedPOstsAdmin = () => API.get("/posts/reported-posts")

export const postDeleteAdmin = (postId) => API.post("/posts/post-delete", { postId })

export const viewPostAdmin = (postId) => API.post("/admin/view-post", { postId })

export const blockUserAdmin = (userID) => API.post("/admin/block-user", { userID })

export const unBlockUserAdmin = (userID) => API.post("/admin/unblock-user", { userID })

export const usersDataAdmin = () => API.get("admin/get-users")