const express = require("express");
require("dotenv/config");

const cors = require("cors");
const PORT = process.env.PORT || 3000;

app = express();
const postsRoute = require("./routes/api/posts.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/posts", postsRoute);

if (process.env.NODE_ENV === "production") {
  //Static Folder
  app.use(express.static(__dirname + "/public/"));

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
