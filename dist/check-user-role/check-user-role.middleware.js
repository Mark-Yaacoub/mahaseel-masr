"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckUserRoleMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const enum_1 = require("../shared/enum");
let CheckUserRoleMiddleware = class CheckUserRoleMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        try {
            const excludedPaths = ['/auth'];
            if (excludedPaths.some(path => req.url.includes(path))) {
                return next();
            }
            const authorizationHeader = req.headers['authorization'];
            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
                return res.status(401).json({
                    status: '401',
                    messageEn: 'Unauthorized',
                    messageAr: 'غير مصرح',
                });
            }
            const token = authorizationHeader.split(' ')[1];
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            if (payload.userRole === enum_1.UserRole.Admin) {
                return next();
            }
            console.log(payload.userId);
            console.log(req.params.id);
            if (payload.userId === req.params.id) {
                console.log(payload, "payload");
                return next();
            }
            else {
                return res.status(401).json({
                    status: '401',
                    messageEn: 'Unauthorized to perform this action',
                    messageAr: ' لا تمتلك صلاحية للدتنفيذ هذا العملية',
                });
            }
        }
        catch (error) {
            return res.status(401).json({
                status: '401',
                messageEn: 'Unauthorized',
                messageAr: 'غير مصرح',
            });
        }
    }
};
exports.CheckUserRoleMiddleware = CheckUserRoleMiddleware;
exports.CheckUserRoleMiddleware = CheckUserRoleMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], CheckUserRoleMiddleware);
//# sourceMappingURL=check-user-role.middleware.js.map