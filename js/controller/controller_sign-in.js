import LoginModel from "../model/model_sign-in.js";
import LoginView from "../view/view_sign-in.js";

export default class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  initialize() {
    const loginButton = document.querySelector(".btn-primary");
    const form = document.querySelector("form");

    loginButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.login();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.login();
    });
  }

  login() {
    const userData = this.view.getUserData();

    if (!this.model.authenticateUser(userData)) {
      return;
    }

    //this.model.setCurrentAccount(userData);
    this.view.redirectToHomePage();
  }
}
