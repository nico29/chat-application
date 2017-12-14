const { Model } = require('mongorito');
const { User } = require('./user');

class Post extends Model {}

Post.embeds('author', User);

export { Post };
