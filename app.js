const express = require('express');
const socket = require('socket.io');

const app = express(); //initialize and server ready

app.use(express.static("public"));




let port = 3000;
let server = app.listen(port, () => {

    console.log("Listening to port ", port)
})

let io = socket(server);

io.on("connection", (socket) => {
    console.log("made socket connection");

    //recieved data from frontend
    socket.on("beginPath", (data) => {

        //transfer data to all connection computers

        io.sockets.emit("beginPath", data);

    })

    //drawStroke

    socket.on("drawStroke", (data) => {

        //transfer data to all connection computers

        io.sockets.emit("drawStroke", data);

    })

    socket.on("redoUndo", (data) => {

        //transfer data to all connection computers

        io.sockets.emit("redoUndo", data);

    })
    //redoUndo
})