"use strict";
const Express = require("express");
const Path = require("path");
const account_1 = require("./middleware/account");
const auth_1 = require("./middleware/auth");
const Session_1 = require("./modules/Session");
const api_1 = require("./routes/api");
const Otp = require("./utils/Otp");
const rootPath = Path.resolve(__dirname, '../');
process.chdir(rootPath);
Otp.setAuthFile(Path.resolve(rootPath, 'data/auth.json'));
const app = Express();
if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
}
app.use(Express.static(Path.resolve(rootPath, 'public')));
app.use(Session_1.middleware);
app.use(account_1.default);
app.use(auth_1.default);
app.use('/api', api_1.default);
app.get('/test', (_request, response) => {
    response.send('Hello World!');
});
app.listen(process.env.PORT || 8080);
