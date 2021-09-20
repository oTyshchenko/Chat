import { io } from "socket.io-client";

export const horizontalLine: string = "hr";
export const SERVER_URL: string = "http://localhost:4000";
export const socket = io(SERVER_URL);