const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = reqire("./config/key");
//application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
    .connect(
        `mongodb+srv://taekyeong:abcd123@boilerplate.ba3kg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("helloWorldasdfasdf"));

app.post("/register", (req, res) => {
    //회원가입할때 필요한 정보들을 client 에서 가져오면
    //그것들을 데이터베이스에 넣어준다.

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});
app.listen(port, () => console.log(`example App ${port}`));
