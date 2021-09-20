import { makeAutoObservable } from "mobx";

class NewMessageIndicator {
  isNewMessageIndicatorExist: boolean  = true;

  constructor() {
    makeAutoObservable(this);
  }

  setIsNewMessageIndicatorExist(IsNewMessageIndicatorExist: boolean) {
    this.isNewMessageIndicatorExist = IsNewMessageIndicatorExist;
  }
}

export default new NewMessageIndicator();
