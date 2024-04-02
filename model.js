// model.js
import PostView from "./view.js";
import PostController from "./controller.js";

export default class PostModel {
  constructor() {
    this.posts = JSON.parse(localStorage.getItem("posts")) || [];
  }

  addPost(postData) {
    this.posts.push(postData);
    localStorage.setItem("posts", JSON.stringify(this.posts));
  }

  getAllPosts() {
    return this.posts;
  }
}
