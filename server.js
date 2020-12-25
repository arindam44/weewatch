const express = require("express");
const { v4: uuidv4 } = require("uuid");
const url = require("url");
const cors = require("cors");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
// var server = app.listen(5000);
const io = require("socket.io")(server, {
	transports: ["websocket", "polling"],
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
});

// var io = require("socket.io")(server);

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
	debug: true,
});

var port = process.env.PORT || 5000;
//app.set("view engine", "ejs");
//app.use(express.static("public"));
app.use("/peerjs", peerServer);
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
// 	res.render("home.ejs");
// });

// app.get("/login", (req, res) => {
// 	//res.redirect(`/${uuidv4()}`);
// 	res.redirect(
// 		url.format({
// 			pathname: `/room`,
// 			query: {
// 				roomId: uuidv4(),
// 				userName: req.query.userName,
// 			},
// 		})
// 	);
// });

// app.get("/room", (req, res) => {
// 	res.render("room", {
// 		roomId: req.query.roomId,
// 		userName: req.query.userName,
// 	});
// });

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (request, response) => {
		response.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

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

	socket.on("call-recieved", (roomId, userId) => {
		socket.to(roomId).emit("user-joined", userId);
	});

	// socket.on("reject-call", (userId, userName) => {
	//   console.log("call rejected of - ", userId, userName);
	//   socket.to(roomId).broadcast.emit("call-rejected");
	// });

	// socket.on("disconnect", () => {
	//   socket.to(roomId).broadcast.emit("user-disconnected", peerId);
	// });
});

// io.on("connection", (socket) => {
// 	socket.on("join-room", (roomId, userId) => {
// 		socket.join(roomId);
// 		socket.to(roomId).broadcast.emit("user-connected", userId);
// 		console.log(`joined room ${roomId}- ${userId}`);

// 		socket.on("message", (message) => {
// 			console.log(message);
// 			socket.to(roomId).emit("createMessage", message);
// 		});

// 		socket.on("disconnect", () => {
// 			socket.to(roomId).broadcast.emit("user-disconnected", userId);
// 		});

// 		socket.on("left", () => {
// 			socket.to(roomId).broadcast.emit("user-disconnected", userId);
// 		});
// 	});
// });

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
