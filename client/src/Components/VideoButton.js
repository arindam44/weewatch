import React, { useState } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";

import VideoIcon from "@material-ui/icons/Videocam";
import VideoOffIcon from "@material-ui/icons/VideocamOff";

function VideoButton({ media, setMedia }) {
	const [enabled, setEnabled] = useState(media.getVideoTracks()[0].enabled);

	const handleClick = () => {
		if (enabled) {
			setEnabled(false);
			media.getVideoTracks()[0].enabled = false;
			setMedia(media);
		} else {
			setEnabled(true);
			media.getVideoTracks()[0].enabled = true;
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
				{enabled ? <VideoIcon /> : <VideoOffIcon />}
			</IconButton>
		</div>
	);
}

export default VideoButton;
