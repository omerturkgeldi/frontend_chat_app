const app = require("express")();
const http = require("http").createServer(app);
const io = require('socket.io')(http, { cors: {origin:'*'}})
// const cors = require('cors')
// const app1 = express()

// const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

http.listen(process.env.PORT || 4000, function(){
    console.log('listening on port 4000')
})

// app1.use(cors())