"use strict";
;
const Fs = require("fs");
const promisify_1 = require("./promisify");
const readFile = promisify_1.default(Fs.readFile);
exports.readFile = readFile;
const writeFile = promisify_1.default(Fs.writeFile);
exports.writeFile = writeFile;
