const Blog = require("../models/Blog.models.js");

const allBlogs = async (req, res) => {
  try {
    const Blogs = await Blog.find().populate("author", "username email");
    res.render("blogDetails", { blogDetails: Blogs });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching blogs");
  }
};

const blogDetailsPage = (req, res) => {
  res.render("blogDetails");
};

const createBlogsPage = (req, res) => {
  res.render("createBlog");
};

const dashboard = (req, res)=>{
  res.render('dashboard')
}
const createBlogs = async (req, res) => {
  const { title, content } = req.body;

  if (!req.user) {
    return res.status(401).send("Unauthorized: Please login first");
  }

  try {
    const createBlog = await new Blog({
      title: title,
      content: content,
      author: req.user._id,
    });

    let result = await createBlog.save();
    console.log(result);
    res.render("Dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating blog");
  }
};

const blogDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchBlog = await Blog.findById(id).populate(
      "author",
      "username email"
    );
    if (!fetchBlog) {
      return res.status(400).send("Blog is not found");
    }
    res.render(`home`, { blog: fetchBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching blog details");
  }
};

const showEditPage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render("editBlog", { blog: blog });
  } catch (error) {
    console.log(error);
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    let result = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true }
    );
    console.log(result);
    res.redirect(`/blogs/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const home = (req, res) => {
  res.render("home");
};
// routes/blogRoutes.js

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Blog.findByIdAndDelete(id);
    console.log(deletedUser);
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting blog");
  }
};


module.exports = {
  allBlogs: allBlogs,
  createBlogsPage: createBlogsPage,
  createBlogs: createBlogs,
  blogDetails: blogDetails,
  showEditPage: showEditPage,
  updateBlog: updateBlog,
  blogDetailsPage: blogDetailsPage,
  home: home,
  deleteUser: deleteUser,
  dashboard : dashboard
};
