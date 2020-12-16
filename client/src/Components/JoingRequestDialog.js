import React from "react";
import { socket, peer } from "../Utils/Socket&Peer";

import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  ...theme.styles,
  text: {
    marginLeft: "5%",
  },
});

function JoingRequestDialog({
  classes,
  open,
  setOpen,
  userName,
  userId,
  call,
}) {
  const rejectRequest = () => {
    // socket.emit("reject-call", userId, userName);
    //call.answer(stream);
    setOpen(false);
  };

  const acceptRequest = () => {
    if (call) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          console.log("stream---", stream);
          call.answer(stream);
          setOpen(false);
        });
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Joining Request</DialogTitle>
      <DialogContentText>
        <Typography
          variant="h6"
          color="textPrimary"
          align="left"
          className={classes.text}
        >
          <b>{userName}</b> wants to join
        </Typography>
      </DialogContentText>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={rejectRequest}
          className={classes.button}
        >
          Reject
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={acceptRequest}
          className={classes.button}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(JoingRequestDialog);
