import { makeAutoObservable } from "mobx";
import { IUser } from "../types/types";

class CurrentCompanion {
    currentCompanion: IUser = {id: '1', userName: 'All'};

  constructor() {
    makeAutoObservable(this);
  }

  changeCurrentCompanion(currentCompanion: IUser) {
    this.currentCompanion = currentCompanion;
  }
}

export default new CurrentCompanion();