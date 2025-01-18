const express = require("express");
const RoleController = require("../Controllers/role.controller");
const router = express.Router();
const { authJwt, authorize } = require("../Middleware/apiAuth.middleware");

router.get("/", RoleController.getRole);

module.exports = router;
