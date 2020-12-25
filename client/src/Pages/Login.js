import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";
import { v4 as uuidV4 } from "uuid";
import Meeting from "./Meeting";
import { socket, peer } from "../Utils/Socket&Peer";
import WaitingDialog from "../Components/WaitingDialog";

import { join } from "../Utils/Socket&Peer";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

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
	spinnerContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 20,
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
	//const [call, setCall] = useState(null);
	const [userStream, setUserStream] = useState(null);
	const [owner, setOwner] = useState(false);

	const handleSubmit = () => {
		console.log(roomId);
		let peers = [];
		localStorage.setItem("peers", peers);

		if (roomId) {
			join(roomId, name);
			if (location.state && location.state.roomId) {
				setShowWaiting(true);
				//socket here
				// socket.on("owner-id", (ownerId) => {
				// 	console.log(ownerId);
				// 	navigator.mediaDevices
				// 		.getUserMedia({
				// 			video: true,
				// 			audio: true,
				// 		})
				// 		.then((stream) => {
				// 			const newCall = peer.call(ownerId, stream);
				// 			console.log("calling---", ownerId);
				// 			setCall(newCall);
				// 		});
				// });
			} else {
				setOwner(true);
				setOpenMeeting(true);
			}
		}
	};

	// useEffect(() => {
	// 	if (call) {
	// 		call.on("stream", (userVideoStream) => {
	// 			console.log("acacascas");
	// 			setUserStream(userVideoStream);
	// 			setShowWaiting(false);
	// 			setOpenMeeting(true);
	// 		});
	// 	}
	// }, [call]);

	peer.on("call", (call) => {
		console.log("login call ");
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true,
			})
			.then((stream) => {
				call.answer(stream);
			});
		call.on("stream", (userVideoStream) => {
			setUserStream(userVideoStream);
			setShowWaiting(false);
			setOpenMeeting(true);
			console.log("acacascas", userVideoStream);
		});
	});

	const waitingDialog = (
		<Dialog open={showWaiting} maxWidth="sm" fullWidth>
			<DialogContent>
				<Typography variant="h5">Asking To Join</Typography>
				<Typography variant="h6">
					You will join as soon as someone lets you in...
				</Typography>
				<div className={classes.spinnerContainer}>
					<CircularProgress color="primary" />
				</div>
			</DialogContent>
		</Dialog>
	);

	return (
		<>
			{waitingDialog}
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
				<Meeting
					name={name}
					roomId={roomId}
					userStream={userStream}
					owner={owner}
				/>
			)}
		</>
	);
}

export default withStyles(styles)(Login);
