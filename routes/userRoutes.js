const express = require("express");
const router = express.Router();

const {
  signup,
  signupUser,
  login,
  loginUser,
  logout,
} = require("../controllers/userControllers.js");

const {
  allBlogs,
  createBlogsPage,
  createBlogs,
  blogDetails,
  showEditPage,
  updateBlog,
  home,
  deleteUser,
  dashboard,
} = require("../routes/blogRoutes.js");

const isLoggedin = require("../middlewares/isLoggedin.js");
const signupValidation = require('../middlewares/signupFormValidation.js')
router.get("/signup", signup);
router.post("/signup",signupValidation, signupUser);
router.get("/login", login);
router.post("/login", loginUser);
router.get("/logout", logout);

// blogs routes

router.get("/blogs", allBlogs);
router.get("/home", home);
router.get("/dashboard", dashboard);
router.get("/blogs/create", createBlogsPage);
router.post("/blogs/create", isLoggedin, createBlogs);
router.get("/blogs/:id", blogDetails); // blog details
router.get("/blogs/:id/edit", showEditPage);
router.post("/blogs/:id/edit",isLoggedin, updateBlog);
router.delete("/blogs/:id/delete",isLoggedin, deleteUser);

module.exports = router;
