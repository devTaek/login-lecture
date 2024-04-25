"use strict"

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl")

// 서버에 해당 라우팅 구현
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;