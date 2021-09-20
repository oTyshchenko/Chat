import { Box, Button, TextField } from "@material-ui/core";
import React, { FC, useState } from "react";
import { makeStyles } from "@material-ui/core";
import currentUser from "../../store/currentUser";
import { ifEnterPressDo } from "../../utils/ifEnterPressDo";
import { socket } from "../../constants/constants";

export const Login: FC = () => {
  const classes = useStyles();

  const [userName, setUserName] = useState<string>("");

  const changeNameInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const changeCurrentUser = () => {
    socket.emit("login", userName);
    socket.on("info about current user", (currentUserFromServer) => {
      currentUser.changeCurrentUser(currentUserFromServer);
    });
  };



  return (
    <Box className={classes.loginForm}>
      <TextField
        variant="outlined"
        label="Enter your name"
        value={userName}
        onChange={changeNameInputValue}
        onKeyUp={(event: React.KeyboardEvent) => ifEnterPressDo(event, changeCurrentUser)}
      />
      <Button
        variant={"contained"}
        className={classes.loginBtn}
        onClick={changeCurrentUser}
      >
        Send
      </Button>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  loginForm: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
    backgroundColor: "whitesmoke",
    borderRadius: "20px",
  },
  loginBtn: {
    marginLeft: "10px",
    height: "54px",
    backgroundColor: "rgb(255, 213, 27)",
    "&:hover": {
      backgroundColor: "rgb(172, 141, 2)",
    },
  },
}));
