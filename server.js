const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const override = require("method-override");
const app = express();

// middleware setup

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(override("_method"));

/// exporting file

const connectDB = require("./config/db.js");
const Blog = require("./models/Blog.models.js");
const User = require("./models/User.models.js");
const userRouts = require("./routes/userRoutes.js");
const passportConfig = require("./config/passport");
// route creating

app.use(
  session({
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const createDummyData = async () => {
  try {
    // new user
    const user = new User({
      name: "sanjay kumar",
      email: "sanjay@gmail.com",
      password: "25624",
    });
    let result = await user.save();
    console.log(result);
    // new blog linked
    const blog = new Blog({
      title: "this is my first blog",
      content: "this is my first content",
      author: user._id,
    });
    const saveBlog = await blog.save();
    console.log(saveBlog);
  } catch (error) {
    console.log(error);
  }
};

// calling the created dummy data

// createDummyData();

// using the exporting file
connectDB();
app.use("/", userRouts);
app.listen(3000, () => {
  console.log("server is running on port no. 3000");
});

// abhi is pura project ko fix karna hai
