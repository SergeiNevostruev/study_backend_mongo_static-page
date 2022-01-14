import express from "express";
import mongoose from "mongoose";
// import Post from "./Post.js"
import router from "./router.js";

const PORT = 5000;
const DB_URL = 'mongodb+srv://user:user@cluster0.gutsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();

app.use(express.json());
app.use('/api', router)


// app.post('/', async (req, res) => {
//     try {
//     // console.log(req.query);
//     // console.log(req.body);
//     const {author, title, content, picture} = req.body;
//     const post = await Post.create({author, title, content, picture});
//     // res.status(200).json('Сервер работает1111');
//     res.json(post);        
//     } catch (e) {
//         res.status(500).json(e);
//     }

// })

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log('SERVER STARTED ON ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();


