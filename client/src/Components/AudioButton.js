import React, { useState } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";

import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

function AudioButton({ media, setMedia }) {
	const [enabled, setEnabled] = useState(media.getAudioTracks()[0].enabled);

	const handleClick = () => {
		if (enabled) {
			setEnabled(false);
			media.getAudioTracks()[0].enabled = false;
			setMedia(media);
		} else {
			setEnabled(true);
			media.getAudioTracks()[0].enabled = true;
			setMedia(media);
		}
	};

	return (
		<div>
			<IconButton
				onClick={handleClick}
				color={enabled ? "default" : "secondary"}
				style={{ zIndex: 6, border: "1px solid gray", margin: 10 }}
			>
				{enabled ? <MicIcon /> : <MicOffIcon />}
			</IconButton>
		</div>
	);
}

export default AudioButton;
