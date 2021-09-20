import { makeAutoObservable } from "mobx";
import { horizontalLine } from "../constants/constants";
import { IMessage } from "../types/types";

class Messages {
  messages: IMessage[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addMessage(message: IMessage) {
    this.messages = [...this.messages, message];
  }

  removeNewMessageIndicator() {
    this.messages = this.messages.filter((message) => message.sender.id !== horizontalLine);
  }
}

export default new Messages();
