import React, { useState } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";

import CallEndIcon from "@material-ui/icons/CallEnd";

function EndButton() {
	return (
		<IconButton
			color="secondary"
			style={{ zIndex: 6, border: "1px solid gray", margin: 10 }}
		>
			<CallEndIcon />
		</IconButton>
	);
}

export default EndButton;
