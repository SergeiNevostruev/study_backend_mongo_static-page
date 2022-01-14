import express from "express"
import Router from "express"
// import Post from "./Post.js"
import PostController from "./PostController.js"

const router = new Router()

// router.get('/index', PostController.auth, express.static(`./assets`, {index: 'index.html'}))
router.post('/reg', PostController.registration)
router.post('/auth', PostController.auth)
router.post('/posts', PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.delete)
router.get('/posts/pages/:page', PostController.getAnyPang)//пангинация

export default router;