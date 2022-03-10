import express from "express";
import http from "http";
import Websocket from "ws";
import {homedir} from "os";
console.log('hello');

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");  //static assets
app.use("/public", express.static(__dirname+"/public"));

// function handleReq(_, res) {
//     res.render("home");
// }

app.get("/", (_, res) => {res.render("home")});
app.get("/*", (_, res) => {res.redirect("/")});

const handleListen = () => console.log(`Listening on http://localhost:3003`);

const server = http.createServer(app);

const wss = new Websocket.Server({server});



server.listen(3003, handleListen);