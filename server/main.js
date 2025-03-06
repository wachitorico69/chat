var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);


server.listen(8080, function () {
    console.log("Servidor corriendo en http://localhost:8080");
});

var messages = [
    {
      author: "Francois",
      text: "Hola, ya viste lo nuevo de Jacques?",
    },
    {
      author: "Jean-Luc",
      text: "Todavía no, tu?",
    },
    {
      author: "Francois",
      text: "Una genialidad",
    },
];
  
app.use(express.static("../public"));

io.on("connection", function (socket) {
    console.log("Alguien se ha conectado con Sockets");
    socket.emit("messages", messages);
  
    socket.on("new-message", function (data) {
      messages.push(data);
  
      io.sockets.emit("messages", messages);
    });
});