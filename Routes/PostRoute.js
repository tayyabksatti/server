import express from "express";
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost, interestPost } from "../Controllers/PostController.js";
const router = express.Router()

router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.put('/:id/interest', interestPost)
router.get('/:id/timeline', getTimelinePosts)
export default router;