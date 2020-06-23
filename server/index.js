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

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
