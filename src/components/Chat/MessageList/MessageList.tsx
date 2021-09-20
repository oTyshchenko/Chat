import React, { FC, useEffect, useRef } from "react";
import { Box } from "@material-ui/core";
import { autorun } from "mobx";
import { makeStyles } from "@material-ui/core";
import { Message } from "./Message/Message";
import messages from "../../../store/messages";
import currentCompanion from "../../../store/currentCompanion";
import { IMessage } from "../../../types/types";
import { observer } from "mobx-react-lite";
import { horizontalLine } from '../../../constants/constants';

export const MessageList: FC = observer(() => {

  const classes = useStyles();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    autorun(() => {
      scrollToBottom();
    });
  });

  const groupChatId = '1';
  const currentMessages = messages.messages.filter((message: IMessage) => {
    if (currentCompanion.currentCompanion.id === groupChatId) {
      return (message.to.id === groupChatId)
    } else {
      return ((message.sender.id === currentCompanion.currentCompanion.id && message.to.id !== groupChatId) || (message.to.id === currentCompanion.currentCompanion.id))
    }
  })

  return (
    <Box className={classes.messageList}>
      {currentMessages.map((message: IMessage) => (
        message.sender.id !== horizontalLine
          ? <Message key={message.id} message={message} />
          : <hr key={message.id} />
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
})

const useStyles = makeStyles(() => ({
  messageList: {
    height: "calc(100% - 120px)",
    backgroundColor: "rgb(111, 11, 168)",
    borderRadius: "20px",
    overflow: "scroll",
  },
}));
