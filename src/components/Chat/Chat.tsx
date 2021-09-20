import { Box } from "@material-ui/core";
import React, { FC } from "react";
import { makeStyles } from "@material-ui/core";
import { SendMessageForm } from "./SendMessageForm/SendMessageForm";
import { MessageList } from "./MessageList/MessageList";
import { User } from "./User/User";
import activeUsers from "../../store/activeUsers"
import currentUser from "../../store/currentUser"
import { IUser } from "../../types/types";
import { observer } from "mobx-react-lite";
import { socket } from "../../constants/constants";

export const Chat: FC = observer(() => {
  const classes = useStyles();

  socket.on('update active users', (activeUsersFromServer: IUser[]) => {
    activeUsers.updateActiveUsers(activeUsersFromServer)
  })

  const usersToRender = activeUsers.activeUsers.filter((user) => user.id !== currentUser.currentUser.id)  

  return (
    <Box className={classes.chat}>
      <Box className={classes.userList}>
        {usersToRender.map((user: IUser) => <User user={user} key={user.id}/>)}
      </Box>
      <Box className={classes.dialog}>
        <MessageList />
        <SendMessageForm />
      </Box>
    </Box>
  );
});

const useStyles = makeStyles(() => ({
  chat: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
    width: "90vw",
    height: "90vh",
    background: "whitesmoke",
    borderRadius: "1%",
  },
  userList: {
    background: "whitesmoke",
    width: "20vw",
    marginRight: "20px"
  },
  dialog: {
    width: "100%",
  },
}));
