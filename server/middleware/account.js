"use strict";
const tslib_1 = require("tslib");
;
const basicAuth = require("basic-auth");
const Otp = require("../utils/Otp");
function main(request, response, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (yield Otp.hasAuthData()) {
            next();
            return;
        }
        const credentials = basicAuth(request);
        if (!credentials || !credentials.name) {
            authRequest(response);
            return;
        }
        yield generateNewAuthData(credentials.name, response);
        response.end();
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
function generateNewAuthData(accountName, response) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield Otp.generate(accountName);
            const uri = yield Otp.getQrCode();
            response.json({
                type: 'NEW_AUTH',
                uri,
            });
        }
        catch (error) {
            console.error(error);
            response.json({
                error: 'Can\'t generate new User Authentication Data',
                type: 'ERROR',
            });
        }
    });
}
function authRequest(response) {
    response.statusCode = 401;
    response.setHeader('WWW-Authenticate', 'Basic realm="Specify your account name"');
    response.end('Unauthorized');
}
