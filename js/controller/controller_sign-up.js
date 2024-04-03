export default class FormController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  initialize() {
    const confirmButton = document.querySelector(".btn-primary");
    const form = document.querySelector("form");

    confirmButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.saveDataToLocalStorage();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.saveDataToLocalStorage();
    });
  }

  saveDataToLocalStorage() {
    const userData = this.view.getUserData();

    if (!this.model.validateUserData(userData)) {
      return;
    }

    if (!this.model.checkExistingAccount(userData)) {
      return;
    }

    this.model.saveUserData(userData);
    this.view.showSuccessMessage();
    this.view.resetForm();
    this.model.setCurrentAccount(userData);
    window.location.href = "./index.html";
  }
}
