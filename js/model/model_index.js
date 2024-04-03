// model.js
import PostView from "../view/view_index.js";
import PostController from "../controller/controller_index.js";

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
