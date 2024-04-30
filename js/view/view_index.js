// view.js
import PostModel from "../model/model_index.js";
import PostController from "../controller/controller_index.js";

export default class PostView {
  constructor() {
    this.postContainer = document.querySelector(".Tred-container");
  }

  renderPost(title, text, tagsHTML, timestamp) {
    const truncatedTitle =
      title.length > 100 ? title.substring(0, 100) + "..." : title;
    const truncatedText =
      text.length > 150 ? text.substring(0, 230) + "..." : text;

    const postHTML = `
    <a class="Card-discuss card border-0" href="./discuss.html?title=${encodeURIComponent(title)}&time=${encodeURIComponent(timestamp)}&content=${encodeURIComponent(text)}" style="text-decoration: none">
    <div class="card-header border-0">${truncatedTitle}</div>
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

    this.postContainer.insertAdjacentHTML("beforeend", postHTML);
  }
}
