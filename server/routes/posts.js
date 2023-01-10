import express from 'express';
import { commentPost, deletePost, getFeedPosts, getPostForDelete, getReportedPosts, getUserPosts, likePost, reportPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/postId-for-delete", getPostForDelete);
router.get("/reported-posts", getReportedPosts);


/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/report", reportPost);




router.patch("/comment", commentPost);

router.post("/post-delete", deletePost);



export default router;