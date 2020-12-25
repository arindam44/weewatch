import Peer from "peerjs";
import io from "socket.io-client";

const socket = io("http://weewatch.herokuapp.com");
let myId;

let peer = new Peer(undefined, {
	path: "/peerjs",
	host: "/",
	port: 443,
});
peer.on("open", (id) => {
	myId = id;
	console.log(id);
});

export const join = (roomId, name) => {
	console.log("join", roomId);
	socket.emit("join-room", roomId, myId, name);
};

export { socket, peer };
