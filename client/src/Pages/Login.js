import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";
import { v4 as uuidV4 } from "uuid";
import Meeting from "./Meeting";
import { socket, peer } from "../Utils/Socket&Peer";
import WaitingDialog from "../Components/WaitingDialog";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
	...theme.styles,
	logo: {
		width: "15vw",
		height: "15vw",
		margin: "auto",
	},
	input: {
		margin: "20px auto",
	},
	buttonContainer: {
		display: "flex",
		justifyContent: "center",
	},
});

function Login(props) {
	const { classes } = props;

	const history = useHistory();
	const location = useLocation();
	const [roomId, setRoomId] = useState(
		(location.state && location.state.roomId) || uuidV4()
	);
	const [name, setName] = useState("");
	const [showWaiting, setShowWaiting] = useState(false);
	const [openMeeting, setOpenMeeting] = useState(false);
	const [call, setCall] = useState(null);
	const [userStream, setUserStream] = useState(null);

	const handleSubmit = () => {
		console.log(roomId);
		console.log(peer._lastServerId);
		if (roomId && peer._lastServerId) {
			socket.emit("join-room", roomId, peer._lastServerId, name);
			if (location.state && location.state.roomId) {
				setShowWaiting(true);
				//socket here
				socket.on("owner-id", (ownerId) => {
					console.log(ownerId);
					navigator.mediaDevices
						.getUserMedia({
							video: true,
							audio: true,
						})
						.then((stream) => {
							const newCall = peer.call(ownerId, stream);
							console.log("calling---", ownerId);
							setCall(newCall);
						});
				});
			} else {
				setOpenMeeting(true);
			}
		}
	};
	useEffect(() => {
		if (call) {
			call.on("stream", (userVideoStream) => {
				setShowWaiting(false);
				setUserStream(userVideoStream);
				setOpenMeeting(true);
			});
		}
	}, [call]);

	return (
		<>
			{showWaiting && <WaitingDialog />}
			{!openMeeting ? (
				<Grid container>
					<Grid item sm={4}></Grid>
					<Grid
						item
						sm={4}
						xs={12}
						style={{ padding: 20, border: "2 px solid lightgray" }}
					>
						<img src={logo} alt="We Watch" className={classes.logo} />
						<TextField
							type="text"
							variant="outlined"
							className={classes.input}
							fullWidth
							required
							value={name}
							label="Name"
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<div className={classes.buttonContainer}>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								className={classes.button}
							>
								{location.state && location.state.roomId
									? "Join Meeting"
									: "Start Meeting"}
							</Button>
						</div>
					</Grid>
				</Grid>
			) : (
				<Meeting name={name} roomId={roomId} userStream={userStream} />
			)}
		</>
	);
}

export default withStyles(styles)(Login);
