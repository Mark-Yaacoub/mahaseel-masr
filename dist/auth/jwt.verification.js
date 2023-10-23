"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtVerification = void 0;
const jwt = require("jsonwebtoken");
class JwtVerification {
    async verification(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            let data;
            jwt.verify(token, 'defaultsecrete', (err, payload) => {
                data = payload;
            });
            return data;
        }
    }
}
exports.JwtVerification = JwtVerification;
//# sourceMappingURL=jwt.verification.js.map