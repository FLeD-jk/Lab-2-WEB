import LoginModel from "./js/model/model_sign-in.js";
import LoginView from "./js/view/view_sign-in.js";
import LoginController from "./js/controller/controller_sign-in.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginModel = new LoginModel();
  const loginView = new LoginView();
  const loginController = new LoginController(loginModel, loginView);

  loginController.initialize();
});
