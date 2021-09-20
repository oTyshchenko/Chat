import React, { FC } from "react";
import { Avatar, Box } from "@material-ui/core";
import { IMessage } from "../../../../types/types";
import { makeStyles } from "@material-ui/core";
import currentUser from "../../../../store/currentUser";

interface MessageProps {
  message: IMessage;
}

export const Message: FC<MessageProps> = ({ message }) => {
  const classes = useStyles();

  return (
    <Box
      className={
        currentUser.currentUser.id !== message.sender.id
          ? classes.message
          : `${classes.message} ${classes.messageRight}`
      }
    >
      <Avatar className={classes.avatar}>
        {message.sender.userName[0].toLocaleUpperCase()}
      </Avatar>
      <Box className={classes.messageText}>{message.messageText}</Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  message: {
    display: "flex",
    justifyContent: "left",
    margin: "10px",
    padding: "10px",
  },
  messageRight: {
    flexDirection: "row-reverse",
    justifyContent: "end",
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "50px",
    maxWidth: "50px",
    height: "50px",
    color: "black",
    backgroundColor: "#fff",
    border: "1px solid #000000",
    borderRadius: "50%",
  },
  messageText: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    margin: "0 10px",
    padding: "10px",
    background: "white",
    borderRadius: "10px",
    wordWrap: "break-word",
  },
}));
