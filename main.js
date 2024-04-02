// main.js
import PostModel from "./model.js";
import PostView from "./view.js";
import PostController from "./controller.js";

document.addEventListener("DOMContentLoaded", function () {
  const model = new PostModel();
  const view = new PostView();
  const controller = new PostController(model, view);
});
