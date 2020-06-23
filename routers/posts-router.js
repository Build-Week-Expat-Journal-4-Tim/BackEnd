const express = require("express");
const router = express.Router();
const Posts = require("../middleware/posts-model");
const { validPostId, validLogIn, validUserEditPost } = require("../middleware/middleWare");


router.get("/", (req, res) => {
  Posts.get()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(`Oops, something went Wrong!`);
    });
});

router.get("/:id", validPostId, (req, res) => {
  res.status(200).json(req.post);
});

router.post("/", (req, res) => {
  // validLogIn,
    const post = req.body;
  post.user_id = req.token.userid;
  post.date = new Date().toDateString()
    Posts.insert(post)
      .then((post) => {
        res.status(201).json( `Congrats! On You're new post!`);
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(`Oops, something went wrong!`);
      });
});


router.put("/:id", validPostId, (req, res) => {
  //after validLogIn, validUserEditPost,
 Posts.update(Number(req.params.id), req.body)
    .then((post) => {
      if (post === 1) {
        res.status(200).json(`You're post has been updated!`);
      } else {
        res.status(404).json(`Sorry, post could not be updated.`);
      }
    })
    .catch((err) => {
      res.status(500).json(`Oops, something went wrong!`);
    });
});


router.delete("/:id", validPostId,  (req, res) => {
  //after validLogIn, validUserEditPost,
  Posts.remove(Number(req.params.id))
    .then((result) => {
      if (result === 1) {
        res.status(200).json('Post has been deleted.');
      } else {
        res.status(404).json(`Sorry, post was not deleted.`);
      }
    })
    .catch((err) => {
      res.status(500).json(`Oops, something went wrong.`);
    });
});



module.exports = router;
