import Post from "./Post.js";
import User from "./User.js";


class PostController {

    async registration (req,res) {
        try {
            const {email, password} = req.body;

            const checkEmail = await User.findOne({ email })

            if (checkEmail) {
            return res.status(400).json({message: 'Такой пользователь уже есть'})                
            }

                        
            const post = await User.create({email, password});
            res.json(post);
            
            
            } catch (e) {
                res.status(500).json(e);
            }
    }

    async auth (req,res) {
        try {
            const {email, password} = req.body;

            const checkUser = await User.findOne({ email })

            if (!checkUser) {
            return res.status(400).json({message: 'Такого пользователя не существует'})                
            }

            if (password === checkUser.password) {
                console.log('выполнен вход')
                // next()
                res.redirect('/index')
            } else {
                console.log('неверный пароль');
                return res.status(400).json({message: 'Неверный пароль'}) 
            }
            
         
            
            } catch (e) {
                res.status(500).json(e);
            }
    }
    
    async create (req, res) {
        try {
            const {author, title, content, picture} = req.body;
            const post = await Post.create({author, title, content, picture});
            res.json(post);        
            } catch (e) {
                res.status(500).json(e);
            }
    }

    async getAll (req, res) {
        try {
                const posts = await Post.find();
                return res.json(posts);
            } catch (e) {
                res.status(500).json(e);
            }
    }

    async getOne (req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: "id не указан"});
            }
            const post = await Post.findById(id);
            return res.json(post);
            } catch (e) {
                res.status(500).json(e);
            }
    }
// пангинация
    async getAnyPang (req, res) {
        try {

            const count = await Post.count()
                console.log('count: ' +count);
            const list = 3;
            console.log('list: ' + list);
            const skipItem = Math.ceil(count/list);
            console.log('skipItem: ' + skipItem);

            const {page} = req.params;
            console.log('page: ' + page);

            const posts = await Post.find().skip(skipItem*(page-1)).limit(list);

            return res.json(posts);

            } catch (e) {
                res.status(500).json(e);
            }
    }

    async update (req, res) {
        try {
            const post = req.body;
            if (!post._id) {
                res.status(400).json({message: "id не указан"});
            }
            const updatedPosp = await Post.findByIdAndUpdate(post._id, post, {new: true});
            return res.json(updatedPosp);
            } catch (e) {
                res.status(500).json(e);
            }
    }

    async delete (req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: "id не указан"});
            }
            const post = await Post.findByIdAndRemove(id);
            return res.json(post);
            } catch (e) {
                res.status(500).json(e);
            }
    }
}

export default new PostController();
