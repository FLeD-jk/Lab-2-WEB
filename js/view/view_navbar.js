export default class View {
  setProfileAndExit() {
    let navElem = document.getElementById("in-up");
    navElem.innerHTML = `<li id="profile" class="nav-item">
    <a class="nav-link" href="./profile.html">Профіль користувача</a>
  </li>
  <li id="exit" class="nav-item">
    <a class="nav-link" href="./sign-in.html">Вихід з профілю</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="./about.html">Про Нас</a>
  </li>`;
  }

  setSignInAndSignUp() {
    let navElem = document.getElementById("in-up");
    navElem.innerHTML = `<li id="sign-in" class="nav-item">
            <a class="nav-link" href="./sign-in.html">Вхід</a>
          </li>
          <li id="sign-up" class="nav-item">
            <a class="nav-link" href="./sign-up.html">Реєстрація</a>
          </li>
          <li class="nav-item">
    <a class="nav-link" href="./about.html">Про Нас</a>
  </li>`;
  }

  gotoLogin(event) {
    event.preventDefault();
    window.location.href = "./sign-in.html";
  }
}
