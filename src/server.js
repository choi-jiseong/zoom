import express from "express";

console.log('hello');

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");  //static assets
app.use("/public", express.static(__dirname+"/public"));

// function handleReq(_, res) {
//     res.render("home");
// }

app.get("/", (_, res) => {res.render("home")});

app.listen(3003);