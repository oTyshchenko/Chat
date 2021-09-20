import { Box, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";
import React, { FC } from "react";
import currentUser from "../store/currentUser";
import { Login } from "./Login/Login";
import { Chat } from "./Chat/Chat";
import newMessageIndicator from "../store/newMessageIndicator";
import messages from "../store/messages";

export const App: FC = observer(() => {
  const classes = useStyles();

  const removeNewMessageIndicator = () => {
    newMessageIndicator.setIsNewMessageIndicatorExist(false);
    messages.removeNewMessageIndicator();
  };

  return (
    <Box className={classes.chatWrapper} onClick={removeNewMessageIndicator}>
      {currentUser.currentUser.userName ? <Chat /> : <Login />}
    </Box>
  );
});

const useStyles = makeStyles(() => ({
  chatWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "grey",
  },
}));
