const express = require("express");

const rbacController = require("../controllers/rbacController");
const hasPermission = require("../middleware/has-permission");

const router = express.Router();

router.get("/admin/rbac", hasPermission("rbac_ver"), rbacController.getPanel);
router.post("/admin/rbac/roles", hasPermission("rbac_asignar_roles"), rbacController.postUpdateUserRoles);

module.exports = router;
