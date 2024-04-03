import Model from "./model_about.js";
import View from "./view_about.js";

export default class Controller {
  constructor() {
    this.Model = new Model();
    this.View = new View();
    this.setData();
  }

  setData() {
    if (this.Model.isActive()) {
      this.View.setProfileAndExit();
    } else {
      this.View.setSignInAndSignUp();
    }
  }

  checkAccess() {
    if (!this.Model.isActive()) {
      this.View.gotoLogin(event);
    }
  }
}
