const express = require("express");
const mongodb = require("mongodb");
require("dotenv/config");

const router = express.Router();

//GET Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//POST Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  try {
    await posts.insertOne({
      title: req.body.title,
      description: req.body.description,
      createdOn: new Date()
    });
    res.status(201).send();
  } catch (err) {
    console.log("POST Error:", err);
  }
});

//DELETE a Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  try {
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
  } catch (err) {
    console.log("DELETE Error:", err);
  }
});

//UPDATE a Post
router.patch("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  try {
    await posts.updateOne(
      { _id: new mongodb.ObjectID(req.params.id) },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          createdOn: new Date()
        }
      }
    );
    res.status(200).send();
  } catch (err) {
    console.log("UPDATE Error:", err);
  }
});

router.get("/*", (req, res) => {
  res.status(404).send("404 Error-Page Not Found!");
});

async function loadPostsCollection() {
  try {
    const client = await mongodb.MongoClient.connect(
      process.env.DB_CONNECTION,
      { useUnifiedTopology: true }
    );
    return client.db("api").collection("posts");
  } catch (error) {
    console.log("cannot connect to MongoDB!!: ", error);
  }
}

module.exports = router;
