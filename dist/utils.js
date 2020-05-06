"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
exports.sleep = function (delay) {
    return new Promise(function (resolve) { return setTimeout(resolve, delay); });
};
exports.askQuestion = function (question) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(function (resolve) {
        return rl.question("\u001B[37m\u001B[1m" + question + "\u001B[0m\u001B[32m ", function (answer) {
            rl.close();
            resolve(answer.trim());
        });
    });
};
