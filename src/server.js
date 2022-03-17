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

function hnadleConnection(socket) {

}

const server = http.createServer(app);

const wss = new Websocket.Server({server});

const sockets = [];


server.listen(3003, handleListen);

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log('connected');
    socket.send("hello!");
    socket.on("close", () => {
        console.log('disconnected');
    });
    socket.on("message", (msg) => {
        const parsedMsg = JSON.parse(msg);
        if (socket["nickname"] === undefined)
            socket["nickname"] = "손님";
        // console.log(Buffer.from(msg, "base64").toString("utf-8"));
        // socket.send(Buffer.from(msg, "base64").toString("utf-8"));
        // 연결된 모든 클라이언트에게 msg를 send 한다.

        switch(parsedMsg.type) {
            case "new_message" :
                // 연결된 모든 클라이언트에게 메시지를 브로드캐스팅
                // 이 떄, 이 메시지를 보낸 클라이언트의 nickname을 포함한다.
                socket.forEach((aSocket)=> {
                    if(aSocket !== socket)
                        aSocket.send(`${socket.nickname} : ${parsedMsg.payload}`);
                })
                break;
            case  "nickname" :
                socket["nickname"] = parsedMsg.payload;
                break;
        }
        // sockets.forEach((aSocket) => {
        //     aSocket.send(Buffer.from(msg, "base64").toString("utf-8"));
        // });

    })
});