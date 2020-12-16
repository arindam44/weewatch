import socketIOClient from "socket.io-client";
import Peer from "peerjs";

// if (process.env.NODE_ENV === "production") {
// 	socket = socketIOClient(
// 		`weewatch.herokuapp.com:5002/socket.io/?EIO=4&transport=websocket`)
var socket = socketIOClient(
	"ws://weewatch.herokuapp.com/socket.io/?EIO=4&transport=websocket"
);
// }

let peer = new Peer();
console.log(peer);
peer.on("open", (id) => {
	console.log("aasdasA" + id);
});

export { socket, peer };
