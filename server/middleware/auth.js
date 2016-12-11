"use strict";
const tslib_1 = require("tslib");
;
const basicAuth = require("basic-auth");
const Session_1 = require("../modules/Session");
const Otp = require("../utils/Otp");
function main(request, response, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const session = request.session;
        if (!session) {
            console.error('No session object');
            next();
            return;
        }
        Session_1.garbageCollector();
        if (!session['lastAccess']
            || ((session['lastAccess'] + Session_1.SESSION_LIFETIME) < Date.now())) {
            const credentials = basicAuth(request);
            if (!credentials) {
                authFail(response);
                return;
            }
            if (yield Otp.check(credentials.name, credentials.pass)) {
                session['lastAccess'] = Date.now();
                next();
            }
            else {
                authFail(response);
            }
            return;
        }
        else {
            session['lastAccess'] = Date.now();
            next();
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
function authFail(response) {
    response.statusCode = 401;
    response.setHeader('WWW-Authenticate', 'Basic realm="Authentication required"');
    response.end('Unauthorized');
}