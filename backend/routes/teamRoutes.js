const express = require("express");

const router = express.Router();

const {
  getUsers,
  searchUsers,
  inviteMember,
} = require("../controllers/teamController");

router.get("/users", getUsers);

router.get("/search", searchUsers);

router.post("/invite", inviteMember);

module.exports = router;