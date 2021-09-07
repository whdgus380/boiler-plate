if (process.env.NODE_ENV === "production") {
    module.exports = require("./prod");
    // console.log("i am productino");
} else {
    console.log("hi");
    module.exports = require("./dev");
}
