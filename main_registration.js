document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const confirmButton = document.querySelector(".btn-primary");

  confirmButton.addEventListener("click", function (event) {
    event.preventDefault(); // Блокуємо стандартну подію кнопки
    saveDataToLocalStorage();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Блокуємо стандартну подію форми
    saveDataToLocalStorage();
  });

  // Функція для зберігання поточного аккаунту в localStorage
  function setCurrentAccount(account) {
    localStorage.setItem("currentAccount", JSON.stringify(account));
  }

  // Функція для отримання поточного аккаунту з localStorage
  function getCurrentAccount() {
    const accountJSON = localStorage.getItem("currentAccount");
    return accountJSON ? JSON.parse(accountJSON) : null;
  }

  function saveDataToLocalStorage() {
    const name = document.getElementById("inputName").value;
    const password = document.getElementById("inputPassword").value;
    const email = document.getElementById("inputEmail").value;
    const dob = document.getElementById("inputDOB").value;

    if (name.length < 4 || password.length < 4) {
      alert("Логін та пароль мають містити щонайменше 4 символи!");
      return false; // Повертаємо false, щоб зупинити подальше виконання функції
    }

    if (!isValidEmail(email)) {
      alert("Будь ласка, введіть правильну електронну скриньку!");
      return false; // Повертаємо false, щоб зупинити подальше виконання функції
    }

    if (!dob) {
      alert("Будь ласка, введіть дату народження!");
      return false; // Повертаємо false, щоб зупинити подальше виконання функції
    }

    const today = new Date().toISOString().split("T")[0];
    if (dob > today) {
      alert("Введіть коректну дату народження, яка не перевищує поточну дату!");
      return false; // Повертаємо false, щоб зупинити подальше виконання функції
    }

    const userData = {
      name: name,
      password: password,
      email: email,
      dob: dob,
    };

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    accounts.push(userData);

    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("Дані успішно збережено!");
    form.reset(); // Очищаємо форму після успішного збереження даних

    // Збереження поточного аккаунту в localStorage
    setCurrentAccount(userData);

    // Перенаправляємо користувача на головну сторінку
    window.location.href = "./index.html";
  }

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
});
