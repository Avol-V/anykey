"use strict";
;
function main(request, response) {
    if (!request.session) {
        response.end();
        return;
    }
    request.session.destroy((error) => {
        if (error) {
            console.error(error);
            response.statusCode = 500;
        }
        response.end();
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
