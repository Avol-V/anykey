"use strict";
;
const BodyParser = require("body-parser");
const Express = require("express");
const logout_1 = require("./api/logout");
const router = Express.Router();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
const jsonParser = BodyParser.json();
router.get('/tree', jsonParser, (_request, response) => {
    response.end();
});
router.get('/logout', logout_1.default);
