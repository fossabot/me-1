require("../../babel.register.js");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const server = require("express");
const app = server();
app.use(server.static(path.join(__dirname, "node_modules/@randy.tarampi/resume/dist")));
module.exports = app.listen(config.get("letter.serverPort"));
