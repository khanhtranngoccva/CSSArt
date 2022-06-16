const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src", "main.js"),
    output: {
        filename: "index.js",
        path: __dirname,
    },
    watch: true
}