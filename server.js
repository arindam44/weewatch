const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer);
//var ExpressPeerServer = require("peer").ExpressPeerServer;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
}

httpServer.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

//app.use(ExpressPeerServer(httpServer));

var rooms = [];

io.on("connection", (socket) => {
	socket.on("join-room", (roomId, peerId, name) => {
		console.log(`joined - ${roomId} - ${peerId} - ${name}`);
		socket.join(roomId);
		if (!rooms[roomId]) {
			const newRoom = {
				//socket: socket,
				ownerId: peerId,
				ownerName: name,
			};
			rooms[roomId] = newRoom;
			console.log(rooms);
		} else {
			//console.log(rooms[roomId]);
			socket.emit("owner-id", rooms[roomId].ownerId);
		}
		socket.to(roomId).broadcast.emit("user-connected", peerId, name);
	});

	// socket.on("reject-call", (userId, userName) => {
	//   console.log("call rejected of - ", userId, userName);
	//   socket.to(roomId).broadcast.emit("call-rejected");
	// });

	// socket.on("disconnect", () => {
	//   socket.to(roomId).broadcast.emit("user-disconnected", peerId);
	// });
});
