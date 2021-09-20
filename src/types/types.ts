export interface IUser {
  id: string;
  userName: string;
}

export interface IMessage {
  id: number;
  sender: IUser;
  messageText: string;
  to: IUser;
}
