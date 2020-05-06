"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = function (delay) {
    return new Promise(function (resolve) { return setTimeout(resolve, delay); });
};
