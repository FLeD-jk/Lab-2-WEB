// main.js
import PostModel from "./js/model/model_index.js";
import PostView from "./js/view/view_index.js";
import PostController from "./js/controller/controller_index.js";

document.addEventListener("DOMContentLoaded", function () {
  const model = new PostModel();
  const view = new PostView();
  const controller = new PostController(model, view);
});
