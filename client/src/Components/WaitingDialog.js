import React from "react";
import { peer } from "../Utils/Socket&Peer";

import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
	...theme.styles,
	spinnerContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 20,
	},
});

function WaitingDialog({ classes }) {
	peer.on("call", (newCall) => {
		console.log("login call ");
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true,
			})
			.then((stream) => {
				newCall.answer(stream);
			});
	});

	return (
		<Dialog open maxWidth="sm" fullWidth>
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
}

export default withStyles(styles)(WaitingDialog);
