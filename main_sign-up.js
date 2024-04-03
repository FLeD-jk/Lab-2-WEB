import FormModel from "./js/model/model_sign-up.js";
import FormView from "./js/view/view_sign-up.js";
import FormController from "./js/controller/controller_sign-up.js";

document.addEventListener("DOMContentLoaded", function () {
  const formModel = new FormModel();
  const formView = new FormView();
  const formController = new FormController(formModel, formView);

  formController.initialize();
});
