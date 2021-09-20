import { makeAutoObservable } from "mobx";


class NewMessageFrom {
  users: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addUserToList(userId: string) {
    this.users = [...this.users, userId];
  }

  removeUserFromList(userId: string) {
    this.users = this.users.filter((user) => user !== userId)
  }
}

export default new NewMessageFrom();
