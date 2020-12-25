import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { peer, socket } from "../Utils/Socket&Peer";
import JoingRequestDialog from "../Components/JoingRequestDialog";
import "./Meeting.css";
import AudioButton from "../Components/AudioButton";
import EndButton from "../Components/EndButton";
import VideoButton from "../Components/VideoButton";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
	...theme.styles,
	container: {
		display: "flex",
		flexDirection: "column",
		height: "100vh",
	},
	ownVideoContainer: {
		position: "relative",
	},
	ownVideo: {
		width: "100%",
		objectFit: "cover",
		bottom: 20,
		right: 10,
	},
	name: {
		marginLeft: 10,
	},
});

function Meeting(props) {
	const { classes, name, roomId, userStream, owner } = props;

	const history = useHistory();
	const location = useLocation();
	const [ownStream, setOwnStream] = useState(null);
	const [showDialog, setShowDialog] = useState(false);
	const [guestId, setGuestId] = useState(null);
	const [guestName, setGuestName] = useState(null);
	const [call, setCall] = useState(null);

	useEffect(() => {
		if (name && socket && peer) {
			let path = window.location.pathname;
			const newPath = `/room/${roomId}`;
			window.history.pushState(null, null, newPath);

			const ownVideo = document.getElementById("ownVideo");
			navigator.mediaDevices
				.getUserMedia({
					video: true,
					audio: true,
				})
				.then((stream) => {
					setOwnStream(stream);
					ownVideo.srcObject = stream;
					ownVideo.addEventListener("loadedmetadata", () => {
						ownVideo.play();
					});
				});

			peer.on("call", (newCall) => {
				console.log("call recieved");
				//if (owner) setShowDialog(true);
				setCall(newCall);
			});

			socket.on("user-connected", (userId, userName) => {
				console.log("user connected---", userId, userName);
				setGuestId(userId);
				setGuestName(userName);
				if (owner) setShowDialog(true);
			});

			console.log("121212121211", userStream);
			if (userStream) {
				const video = document.createElement("video");
				addVideoStream(video, userStream);
			}
		} else {
			let roomId = location.pathname.split("/");
			roomId = roomId[roomId.length - 1].split(",");
			roomId = roomId[0];
			console.log(roomId);
			history.push({
				pathname: "/",
				state: {
					roomId: roomId,
				},
			});

			console.log("121212121211", userStream);
			if (userStream) {
				const video = document.createElement("video");
				addVideoStream(video, userStream);
			}
		}
		// return () => {};
	}, []);

	useEffect(() => {
		if (call) {
			const video = document.createElement("video");

			if (!owner) {
				call.answer(ownStream);
				// let peers = localStorage.getItem("peers");
				// peers.push(call);
				// localStorage.setItem("peers", peers);
			}

			call.on("stream", (userVideoStream) => {
				addVideoStream(video, userVideoStream);
			});
		}
	}, [call]);

	const addVideoStream = (video, stream) => {
		video.srcObject = stream;
		video.addEventListener("loadedmetadata", () => {
			video.play();
		});
		document.getElementById("videoGrid").append(video);
	};

	// socket.on("user-joined", (id) => {
	// 	if (id !== peer.id) {
	// 		console.log("3rd user");
	// 		navigator.mediaDevices
	// 			.getUserMedia({
	// 				video: true,
	// 				audio: true,
	// 			})
	// 			.then((stream) => {
	// 				var newCall = peer.call(id, stream);
	// 				setCall(newCall);
	// 			});
	// 	}
	// });

	return (
		<div className={classes.container}>
			<Grid container style={{ flexGrow: 1 }}>
				<Grid item sm={10} xs={12} style={{ flexGrow: 1 }}>
					<Typography variant="h6" align="left" className={classes.name}>
						{name}
					</Typography>
					<div className={classes.videoGrid} id="videoGrid"></div>
				</Grid>
				<Grid item sm={2} xs={12} className={classes.ownVideoContainer}>
					<video muted id="ownVideo" className={classes.ownVideo} />
				</Grid>
				<Grid item xs={12} sm={12}></Grid>
				<JoingRequestDialog
					roomId={roomId}
					userName={guestName}
					userId={guestId}
					open={showDialog}
					setOpen={setShowDialog}
					call={call}
					setCall={setCall}
				/>
			</Grid>
			<Grid container>
				{ownStream && (
					<Grid
						item
						sm={12}
						xs={12}
						style={{
							display: "flex",
							justifyContent: "center",
							backgroundColor: "#e3e3e3",
						}}
					>
						<AudioButton media={ownStream} setMedia={setOwnStream} />
						<EndButton />
						<VideoButton media={ownStream} setMedia={setOwnStream} />
					</Grid>
				)}
			</Grid>
		</div>
	);
}

export default withStyles(styles)(Meeting);
