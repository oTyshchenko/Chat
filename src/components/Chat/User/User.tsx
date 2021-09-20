import { Box, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'
import { IUser } from '../../../types/types'
import currentCompanion from "../../../store/currentCompanion"
import newMessageFrom from "../../../store/newMessageFrom"
import { observer } from 'mobx-react-lite'

interface UserProps {
    user: IUser;
}

export const User: FC<UserProps> = observer(({ user }) => {
    const classes = useStyles();

    const changeCurrentCompanion = (user: IUser) => {
        currentCompanion.changeCurrentCompanion(user);
        newMessageFrom.removeUserFromList(user.id);
    }

    return (
        <Box
            className={(currentCompanion.currentCompanion.id === user.id) ? `${classes.userName} ${classes.currentCompanion}` : classes.userName}
            onClick={() => changeCurrentCompanion(user)}
        >
            <Box>{user.userName}</Box>
            <Box className={classes.newMessageIcon}>{newMessageFrom.users.includes(user.id) ? 'new' : ''}</Box>
        </Box>
    )
})

const useStyles = makeStyles(() => ({
    userName: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        background: "rgb(111, 11, 168)",
        borderRadius: "5px",
    },
    currentCompanion: {
        background: "rgb(255, 213, 27)"
    },
    newMessageIcon: {
        background: 'pink'
    }
}));