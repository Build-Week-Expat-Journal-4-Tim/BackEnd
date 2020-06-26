const express = require("express")
const router = express.Router();
const Users = require("../middleware/users-model");


router.use(express.json());

router.get('/', (req, res) => {
  Users.getUser()
  .then(user => {
    if (user) {
      res.status(200).json(user)
  } else {
      res.status(401).json('No users found in the database')
  }
  })
  .catch(error => {
    res.status(500).json(`Oops! Something Went Wrong. Please try again! ${error}`)
})
})

router.get("/:id", (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json(`Invalid User ID.`);
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) =>
      res.status(500).json(`Oops, something went wrong. ${error}`)
    );
});

router.get("/:id/posts", (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch((error) =>
      res.status(500).json(`Oops, something went wrong. ${error}`)
    );
})

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
  .then(user => {
    if (user === 1) {
      res.status(200).json(`Congrats! You Deleted ${user} record!`)
    } else {
      res.status(404).json(`Sorry, user could not be deleted.`)
    }
  })
  .catch((error) =>
     res.status(500).json(`Oops, something went wrong. ${error}`)
    );
});

module.exports = router;