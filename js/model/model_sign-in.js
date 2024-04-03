export default class LoginModel {
  authenticateUser(userData) {
    const { email, password } = userData;
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const user = accounts.find(
      (account) => account.email === email && account.password === password
    );

    if (!user) {
      alert("Невірний логін або пароль!");
      return false;
    }

    this.setCurrentAccount(user);
    return true;
  }

  setCurrentAccount(account) {
    localStorage.setItem("currentAccount", JSON.stringify(account));
  }
}
