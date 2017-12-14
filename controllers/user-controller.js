import { userInfo } from 'os';

const { User } = require('../models/user');


module.exports = {
    saveUser (userInfos) {
        let user;
        try {
            user = User.find(userInfo);
        } catch (err) {
            user = new User(userInfos);
        }
        return user.save();
    }
};
