export default class Model {
  isActive() {
    let raw = localStorage.getItem("currentAccount");
    if (raw == null) {
      return false;
    } else {
      return true;
    }
  }

  removeActive() {
    localStorage.removeItem("currentAccount");
  }
}
