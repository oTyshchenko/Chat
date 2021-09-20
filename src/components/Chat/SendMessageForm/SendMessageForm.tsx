import React, { FC, useEffect, useState } from "react";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { IMessage } from "../../../types/types";
import currentUser from "../../../store/currentUser";
import currentCompanion from "../../../store/currentCompanion";
import messages from "../../../store/messages";
import newMessageFrom from "../../../store/newMessageFrom";
import newMessageIndicator from '../../../store/newMessageIndicator'
import { horizontalLine, socket } from '../../../constants/constants';
import { ifEnterPressDo } from "../../../utils/ifEnterPressDo";

export const SendMessageForm: FC = () => {

  const classes = useStyles();

  const [newMessage, setNewMessage] = useState<string>("");

  const changeNewMessageInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMessage(event.target.value);
  };

  const sendMessage = () => {
    if (/\S/.test(newMessage)) {
      socket.emit("chat message", {
        id: Math.random(),
        sender: currentUser.currentUser,
        messageText: newMessage,
        to: currentCompanion.currentCompanion
      });
      setNewMessage("");
      newMessageFrom.removeUserFromList(currentCompanion.currentCompanion.id)
    }
  };

  useEffect(() => {
    socket.on("chat message", function (message: IMessage) {
      if (
        message.sender.id !== currentUser.currentUser.id &&
        !newMessageIndicator.isNewMessageIndicatorExist
      ) {
        messages.addMessage({
          id: Math.random(),
          sender: { id: horizontalLine, userName: horizontalLine },
          messageText: horizontalLine,
          to: currentCompanion.currentCompanion
        });
        newMessageIndicator.setIsNewMessageIndicatorExist(true);
      }
      messages.addMessage(message);
      if (message.to.id === '1') {
        newMessageFrom.addUserToList('1')
      } else {
        newMessageFrom.addUserToList(message.sender.id)
      }
    });
  }, []);

  return (
    <Box className={classes.sendMessageForm} onKeyUp={(event: React.KeyboardEvent) => ifEnterPressDo(event, sendMessage)}>
      <TextField
        className={classes.sendMessageInput}
        multiline
        rows={2}
        variant="outlined"
        label="Enter your message"
        value={newMessage}
        onChange={changeNewMessageInputValue}
      />
      <Button
        variant={"contained"}
        className={classes.sendMessageBtn}
        onClick={sendMessage}
      >
        Send
      </Button>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  sendMessageForm: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    height: "100px",
    background: "rgb(111, 11, 168)",
    borderRadius: "20px",
  },
  sendMessageInput: {
    width: "100%",
    background: "white",
    borderRadius: "10px",
  },
  sendMessageBtn: {
    marginLeft: "10px",
    height: "54px",
    backgroundColor: "rgb(255, 213, 27)",
    "&:hover": {
      backgroundColor: "rgb(172, 141, 2)",
    },
  },
}));
