import Peer from "peerjs";
import io from "socket.io-client";

const socket = io();

let peer = new Peer();
console.log(peer);
peer.on("open", (id) => {
	console.log("aasdasA" + id);
});

export { peer, socket };
