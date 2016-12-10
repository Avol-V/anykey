"use strict";
const tslib_1 = require("tslib");
;
const otplib_1 = require("otplib");
const FsAsync = require("./FsAsync");
const SERVICE = 'AnyKey-PM';
const KEY_LENGTH = 20;
let authFile;
let authData;
function setAuthFile(filePath) {
    authFile = filePath;
    authData = null;
}
exports.setAuthFile = setAuthFile;
function hasAuthData() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield updateAuthData();
        }
        catch (_error) {
            return false;
        }
        return Boolean(authData && authData.accountName && authData.secret);
    });
}
exports.hasAuthData = hasAuthData;
function generate(accountName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!authFile) {
            throw new Error('Auth file required.');
        }
        const secret = otplib_1.authenticator.generateSecret(KEY_LENGTH);
        authData = {
            accountName,
            secret,
        };
        console.log(authData);
        return FsAsync.writeFile(authFile, JSON.stringify(authData));
    });
}
exports.generate = generate;
function updateAuthData() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!authFile) {
            throw new Error('Auth file required.');
        }
        if (!authData) {
            const rawData = yield FsAsync.readFile(authFile, 'utf8');
            authData = JSON.parse(rawData);
        }
    });
}
function getQrCode() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield updateAuthData();
        if (!authData) {
            throw new Error('Can\'t get auth data.');
        }
        const uri = otplib_1.authenticator.qrcode(authData.accountName, SERVICE, authData.secret);
        return Promise.resolve(uri);
    });
}
exports.getQrCode = getQrCode;
function check(accountName, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield updateAuthData();
        if (!authData) {
            throw new Error('Can\'t get auth data.');
        }
        return ((accountName === authData.accountName)
            && otplib_1.authenticator.check(token, authData.secret));
    });
}
exports.check = check;
