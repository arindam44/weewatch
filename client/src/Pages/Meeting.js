import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { peer, socket } from "../Utils/Socket&Peer";
import JoingRequestDialog from "../Components/JoingRequestDialog";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
	...theme.styles,
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
	const { classes, name, roomId, userStream } = props;

	const history = useHistory();
	const location = useLocation();
	var ownStream;
	const [showDialog, setShowDialog] = useState(false);
	const [guestId, setGuestId] = useState(null);
	const [guestName, setGuestName] = useState(null);
	const [call, setCall] = useState(null);

	useEffect(() => {
		if (name && socket && peer) {
			console.log("socket------", socket);
			console.log("peer-------", peer);
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
					ownStream = stream;
					ownVideo.srcObject = stream;
					ownVideo.addEventListener("loadedmetadata", () => {
						ownVideo.play();
					});
				});

			peer.on("call", (newCall) => {
				setShowDialog(true);
				setCall(newCall);
			});

			socket.on("user-connected", (userId, userName) => {
				console.log("user connected---", userId, userName);
				setGuestId(userId);
				setGuestName(userName);
			});

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
		}
		// return () => {};
	}, []);

	useEffect(() => {
		if (call) {
			const video = document.createElement("video");

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

	return (
		<Grid container>
			<Grid item sm={10} xs={12}>
				<Typography variant="h6" align="left" className={classes.name}>
					{name}
				</Typography>
				<div className={classes.videoGrid} id="videoGrid"></div>
			</Grid>
			<Grid item sm={2} xs={12} className={classes.ownVideoContainer}>
				<video muted id="ownVideo" className={classes.ownVideo} />
			</Grid>
			<JoingRequestDialog
				userName={guestName}
				userId={guestId}
				open={showDialog}
				setOpen={setShowDialog}
				call={call}
			/>
		</Grid>
	);
}

export default withStyles(styles)(Meeting);
