const { Post } = require('../models/post');
const { User } = require('../models/user');

module.exports = {
    getAllPosts () {
        return Post.find();
    },

    async storePost (data) {
        let author;
        let post;
        try {
            author = await User.find({ pseudo: data.author.pseudo });
        } catch (err) {
            author = new User({ ...data.author });
        } finally {
            post = new Post({
                ...data,
                ...{ author }
            });
        }
        return post.save();
    }
};
