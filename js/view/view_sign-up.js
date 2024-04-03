export default class FormView {
  getUserData() {
    return {
      name: document.getElementById("inputName").value,
      password: document.getElementById("inputPassword").value,
      email: document.getElementById("inputEmail").value,
      dob: document.getElementById("inputDOB").value,
    };
  }

  showSuccessMessage() {
    alert("Дані успішно збережено!");
  }

  resetForm() {
    document.querySelector("form").reset();
  }
}
