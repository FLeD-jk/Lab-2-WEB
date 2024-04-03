const currentaccountJSON = localStorage.getItem("currentAccount");

if (currentaccountJSON) {
  const currentaccount = JSON.parse(currentaccountJSON);

  const nameElement = document.getElementById("login");
  const dobElement = document.getElementById("dob");

  nameElement.textContent = currentaccount.name;
  dobElement.textContent = "День народження: " + currentaccount.dob;

  const logoutLink = document.querySelector('a[href="./sign-in.html"]');

  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.removeItem("currentAccount");

    window.location.href = "./index.html";
  });
} else {
  console.log("Дані про аккаунт не знайдені в LocalStorage");
}
