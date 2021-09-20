import { makeAutoObservable } from "mobx";
import { IUser } from "../types/types";

class ActiveUsers {
  activeUsers: IUser[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateActiveUsers(users: IUser[]) {
    this.activeUsers = users;
  }
}

export default new ActiveUsers();