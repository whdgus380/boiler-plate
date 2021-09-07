const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});
userSchema.pre(`save`, function (next) {
    var user = this;
    if (user.isModified("password")) {
        // 비밀번호를 암호화시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                console.log(user.password);
                next();
            });
        });
    } else {
        next();
    }
});
userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainpassword 123456 //암호화된 비밀번호$2b$10$rqeNi/tLhKWID7ayzo6bVO/Bs0fk.w9bAecqap7qfrFcXZkiPY5dK"
    var user = this;
    // console.log(plainPassword);
    // plain = plainPassword.password;
    bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
        console.log(plainPassword, user.password);
        if (err) {
            console.log("에러라니까");
            return cb(err);
        }
        // isMatch = true;
        console.log("isMatch", isMatch);
        cb(null, isMatch);
    });
};
userSchema.methods.generateToken = function (cb) {
    var user = this;
    console.log(user._id);
    //token 생성하기
    // vjwt.sign(user._id, "secretToken");
    var token = jwt.sign(user._id.toHexString(), "secretToken");
    // user._id + 'secretToken' = token
    //  ->
    //  'secretToken' -> user._id
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    //토큰을 decode한다.

    jwt.verify(token, "secretToken", function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언테에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};
const User = mongoose.model("User", userSchema);
module.exports = { User };
