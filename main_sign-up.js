import FormModel from "./model_sign-up.js";
import FormView from "./view_sign-up.js";
import FormController from "./controller_sign-up.js";

document.addEventListener("DOMContentLoaded", function () {
  const formModel = new FormModel();
  const formView = new FormView();
  const formController = new FormController(formModel, formView);

  formController.initialize();
});
