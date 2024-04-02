document.addEventListener("DOMContentLoaded", function () {
  const confirmButton = document.querySelector("#add_post_modal .btn-primary");
  confirmButton.addEventListener("click", function () {
    addPost();
  });

  loadPosts();

  registerTagButtons();
  registerSubnavigationButtons();

  function addPost() {
    const title = document.querySelector("#add_title_post").value;
    const text = document.querySelector("#todo-text-input").value;

    if (title.trim() === "" || text.trim() === "") {
      alert("Поле заголовка або тексту не може бути порожнім!");
      return;
    }

    const selectedTags = updateSelectedTags();
    const tagsHTML = generateTagsHTML(selectedTags);
    const timestamp = new Date().toLocaleString();

    const newPost = createPostHTML(title, text, tagsHTML, timestamp);

    const postContainer = document.querySelector(".Tred-container");
    postContainer.insertAdjacentHTML("beforeend", newPost);

    const postData = { title, text, tags: selectedTags, timestamp };
    savePostData(postData);

    const modal = bootstrap.Modal.getInstance(
      document.querySelector("#add_post_modal")
    );
    modal.hide();
  }

  function generateTagsHTML(tags) {
    return tags
      .map(
        (tag) =>
          `<span class="tag align-self-start" style="background-color: ${getTagColor(
            tag
          )}; font-size: 15px; color: rgb(42, 46, 51);">${tag}</span>`
      )
      .join("");
  }

  function createPostHTML(title, text, tagsHTML, timestamp) {
    // Обрізаємо текст до 100 символів
    const truncatedText = text.length > 100 ? text.slice(0, 150) + "..." : text;

    return `
      <a class="Card-discuss card border-0" href="./discuss.html" style="text-decoration: none">
          <div class="card-header border-0">${title}</div>
          <div class="card-body d-flex justify-content-between">
              <div>
                  <h5 class="card-title">${truncatedText}</h5>
                  <p class="card-text">Created at: ${timestamp}</p>
              </div>
              <div class="d-flex">
                ${tagsHTML}
              </div>
          </div>
      </a>
    `;
  }

  function savePostData(postData) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(postData);
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach((postData) => {
      const { title, text, tags, timestamp } = postData;
      const tagsHTML = generateTagsHTML(tags);
      const newPost = createPostHTML(title, text, tagsHTML, timestamp);
      const postContainer = document.querySelector(".Tred-container");
      postContainer.insertAdjacentHTML("beforeend", newPost);
    });
  }

  function registerTagButtons() {
    const tagButtons = document.querySelectorAll("#tags .tag-checkbox");
    tagButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        this.classList.toggle("selected");
      });
    });
  }

  function registerSubnavigationButtons() {
    const navTagButtons = document.querySelectorAll(".list-group-item-action");
    navTagButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        handleSubnavigationClick(button);
      });
    });
  }

  function handleSubnavigationClick(button) {
    // Deselect all previously selected buttons
    const navTagButtons = document.querySelectorAll(".list-group-item-action");
    navTagButtons.forEach((prevButton) =>
      prevButton.classList.remove("selected")
    );

    // Select the clicked button
    button.classList.add("selected");

    // Filter posts based on selected category
    const selectedTag = button.textContent.trim();
    filterPosts(selectedTag);
  }

  function updateSelectedTags() {
    const selectedTags = [];
    const tagButtons = document.querySelectorAll("#tags .tag-checkbox");
    tagButtons.forEach(function (button) {
      if (button.classList.contains("selected")) {
        selectedTags.push(button.getAttribute("data-tag"));
      }
    });
    return selectedTags;
  }

  function getTagColor(tag) {
    switch (tag) {
      case "Обговорення":
        return "rgb(153, 50, 204)";
      case "F.A.Q.":
        return "rgb(154, 205, 50)";
      case "Торгівля":
        return "rgb(255, 215, 0)";
      case "Новини":
        return "rgb(41, 111, 196)";
      case "Правила":
        return "rgb(255, 99, 71)";
      default:
        return "rgb(42, 46, 51)";
    }
  }

  function filterPosts(selectedTag) {
    const posts = document.querySelectorAll(".Tred-container .Card-discuss");

    posts.forEach((post) => {
      const tags = post.querySelectorAll(".tag");
      let isVisible = false;

      tags.forEach((tag) => {
        if (tag.textContent === selectedTag || selectedTag === "") {
          isVisible = true;
        }
      });

      if (isVisible) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  }

  function getSelectedTag() {
    const selectedTagButton = document.querySelector(
      ".list-group-item-action.selected"
    );
    if (selectedTagButton) {
      return selectedTagButton.textContent.trim();
    } else {
      return "";
    }
  }

  // Додано функцію для деактивації всіх фільтрів
  const allCategoriesButton = document.querySelector(".btn-all-categories");
  allCategoriesButton.addEventListener("click", function () {
    // Деактивувати всі фільтри
    const navTagButtons = document.querySelectorAll(".list-group-item-action");
    navTagButtons.forEach((button) => button.classList.remove("selected"));

    // Викликати функцію для відображення всіх постів
    filterPosts("");
  });
});
