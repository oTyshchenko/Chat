import { makeAutoObservable } from "mobx";
import { IUser } from "../types/types";

class CurrentUser {
  currentUser: IUser = {id: '', userName: ''};

  constructor() {
    makeAutoObservable(this);
  }

  changeCurrentUser(currentUser: IUser) {
    this.currentUser = currentUser;
  }
}

export default new CurrentUser();
