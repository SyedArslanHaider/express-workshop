const express = require("express");
const formidable = require("express-formidable");
const fs = require("fs").promises;
const app = express();
app.use(express.static("public"));

app.use(formidable());
// app.get("/", (req, res) => {
//   res.send("Hello Welcome!");
// });
//app.get("/nodegirls", (req, res) => { res.send("Yay Node Girls!");});
app.get("/get-posts", (req, res) => {
    fs.readFile(__dirname + "/data/posts.json")
  .then(file => {
    //  console.log(file.toString());
      const parsedFile = JSON.parse(file);
      res.status(200).send(parsedFile);
  })
  // do something
});
app.post("/create-post", (req, res) => {
    newBlog = req.fields.blogpost;
    fs.readFile(__dirname + "/data/posts.json")
        .then(file => {
            const blogPosts = JSON.parse(file);
            const newTimeStamp = Date.now();
            blogPosts[newTimeStamp] = newBlog;
            fs.writeFile(
                __dirname + "/data/posts.json",
                JSON.stringify(blogPosts))
                .then(() => {
                    res.status(200).json({newTimeStamp:blogPosts});
                });
        });
    // console.log(req.fields);
    // res.status(200).send(req.fields.blogpost);
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});