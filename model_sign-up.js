// form_model.js
export default class FormModel {
  validateUserData(userData) {
    const { name, password, email, dob } = userData;

    if (name.length < 4 || password.length < 4) {
      alert("Логін та пароль мають містити щонайменше 4 символи!");
      return false;
    }

    if (!this.isValidEmail(email)) {
      alert("Будь ласка, введіть правильну електронну скриньку!");
      return false;
    }

    if (!dob) {
      alert("Будь ласка, введіть дату народження!");
      return false;
    }

    const today = new Date().toISOString().split("T")[0];
    if (dob > today) {
      alert("Введіть коректну дату народження, яка не перевищує поточну дату!");
      return false;
    }

    return true;
  }

  isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  checkExistingAccount(userData) {
    const { email, name } = userData;
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const existingAccount = accounts.find(
      (account) => account.email === email || account.name === name
    );

    if (existingAccount) {
      alert(
        "Обліковий запис з такою електронною адресою або іменем користувача вже існує!"
      );
      return false;
    }

    return true;
  }

  saveUserData(userData) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    accounts.push(userData);
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  setCurrentAccount(account) {
    localStorage.setItem("currentAccount", JSON.stringify(account));
  }
}
