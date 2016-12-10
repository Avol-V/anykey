"use strict";
const tslib_1 = require("tslib");
;
const DEFAULT_OPTIONS = {
    multiArgs: false,
    thisArg: null,
};
function promisify(nodeFunction, options) {
    const allOptions = tslib_1.__assign({}, DEFAULT_OPTIONS, options);
    return (...args) => {
        return new Promise((resolve, reject) => {
            args.push((error, ...results) => (error
                ? reject(error)
                : (allOptions.multiArgs
                    ? resolve(results)
                    : resolve(results[0]))));
            nodeFunction.apply(allOptions.thisArg, args);
        });
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = promisify;
