import Model from "../model/model_navbar.js";
import View from "../view/view_navbar.js";

export default class Controller {
  constructor() {
    this.Model = new Model();
    this.View = new View();
    this.setData();
  }

  setData() {
    if (this.Model.isActive()) {
      this.View.setProfileAndExit();
      document
        .getElementById("exit")
        .addEventListener("click", () => this.logout());
    } else {
      this.View.setSignInAndSignUp();
    }
  }

  logout() {
    this.Model.removeActive();
    window.location.href = "./index.html";
  }
}
