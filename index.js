import express from "express"
import mongoose from "mongoose"
// import Post from "./Post.js"
import router from "./router.js"
import PostController from "./PostController.js"
// import path from "path"


const PORT = 5000
const DB_URL = 'mongodb+srv://user:user@cluster0.gutsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()

app.use(express.json())

app.use('/', express.static(`./assets`, {index: 'auth.html'}))
app.use('/index', express.static(`./assets`, {index: 'index.html'}))
app.use('/api', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log('SERVER STARTED ON ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp()


