// controller.js
import PostModel from "../model/model_index.js";
import PostView from "../view/view_index.js";

export default class PostController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initialize();
  }

  initialize() {
    const confirmButton = document.querySelector(
      "#add_post_modal .btn-primary"
    );
    confirmButton.addEventListener("click", this.addPost.bind(this));
    this.loadPosts();
    this.registerTagButtons();
    this.registerSubnavigationButtons();
    this.registerSearch();

    const allCategoriesButton = document.querySelector(".btn-all-categories");
    allCategoriesButton.addEventListener("click", () => {
      const navTagButtons = document.querySelectorAll(
        ".list-group-item-action"
      );
      navTagButtons.forEach((button) => button.classList.remove("selected"));
      this.filterPosts("");
    });
  }

  addPost() {
    const title = document.querySelector("#add_title_post").value;
    const text = document.querySelector("#todo-text-input").value;

    if (title.trim() === "" || text.trim() === "") {
      alert("Поле заголовка або тексту не може бути порожнім!");
      return;
    }

    const selectedTags = this.updateSelectedTags();
    const tagsHTML = this.generateTagsHTML(selectedTags);
    const timestamp = new Date().toLocaleString();

    const postData = { title, text, tags: selectedTags, timestamp };
    this.model.addPost(postData);
    this.view.renderPost(title, text, tagsHTML, timestamp);

    const modal = bootstrap.Modal.getInstance(
      document.querySelector("#add_post_modal")
    );
    modal.hide();
  }

  generateTagsHTML(tags) {
    return tags
      .map(
        (tag) =>
          `<span class="tag align-self-start" style="background-color: ${this.getTagColor(
            tag
          )}; font-size: 15px; color: rgb(42, 46, 51);">${tag}</span>`
      )
      .join("");
  }

  loadPosts() {
    const posts = this.model.getAllPosts();
    posts.forEach((postData) => {
      const { title, text, tags, timestamp } = postData;
      const tagsHTML = this.generateTagsHTML(tags);
      this.view.renderPost(title, text, tagsHTML, timestamp);
    });
  }

  registerTagButtons() {
    const tagButtons = document.querySelectorAll("#tags .tag-checkbox");
    tagButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("selected");
      });
    });
  }

  registerSubnavigationButtons() {
    const navTagButtons = document.querySelectorAll(".list-group-item-action");
    navTagButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handleSubnavigationClick(button);
      });
    });
  }

  registerSearch() {
    const searchForm = document.querySelector("form.d-flex");
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchTerm = event.target.querySelector("input[type=search]").value;
      this.searchPostsByTitle(searchTerm);
    });
  }

  searchPostsByTitle(searchTerm) {
    const posts = document.querySelectorAll(".Tred-container .Card-discuss");

    posts.forEach((post) => {
      const title = post.querySelector(".card-title").textContent.toLowerCase();
      if (title.includes(searchTerm.toLowerCase())) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  }

  handleSubnavigationClick(button) {
    const navTagButtons = document.querySelectorAll(".list-group-item-action");
    navTagButtons.forEach((prevButton) =>
      prevButton.classList.remove("selected")
    );

    button.classList.add("selected");

    const selectedTag = button.textContent.trim();
    this.filterPosts(selectedTag);
  }

  updateSelectedTags() {
    const selectedTags = [];
    const tagButtons = document.querySelectorAll("#tags .tag-checkbox");
    tagButtons.forEach((button) => {
      if (button.classList.contains("selected")) {
        selectedTags.push(button.getAttribute("data-tag"));
      }
    });
    return selectedTags;
  }

  getTagColor(tag) {
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

  filterPosts(selectedTag) {
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

  getSelectedTag() {
    const selectedTagButton = document.querySelector(
      ".list-group-item-action.selected"
    );
    if (selectedTagButton) {
      return selectedTagButton.textContent.trim();
    } else {
      return "";
    }
  }
}
