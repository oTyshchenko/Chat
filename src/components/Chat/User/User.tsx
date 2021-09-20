import { Box, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'
import { IUser } from '../../../types/types'
import currentCompanion from "../../../store/currentCompanion"
import { observer } from 'mobx-react-lite'

interface UserProps {
    user: IUser;
}

export const User: FC<UserProps> = observer(({ user }) => {
    const classes = useStyles();

    const changeCurrentCompanion = (user: IUser) => {
        currentCompanion.changeCurrentCompanion(user);
    }

    return (
        <Box
            className={(currentCompanion.currentCompanion.id === user.id) ? `${classes.userName} ${classes.currentCompanion}` : classes.userName}
            onClick={() => changeCurrentCompanion(user)}
        >
            {user.userName}
        </Box>
    )
})

const useStyles = makeStyles(() => ({
    userName: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        background: "rgb(111, 11, 168)",
        borderRadius: "5px",
    },
    currentCompanion: {
        background: "rgb(255, 213, 27)"
    }
}));